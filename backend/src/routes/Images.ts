import { Request, Response, Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const ImagesRouter = Router();

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    const materielName = req.body.materiel_name;
    console.warn("body:", req.body);
    if (materielName) {
      cb(null, `${materielName}.jpg`);
    } else {
      console.warn("No materiel name provided");
      cb(new Error("No materiel name provided"), "");
    }
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage });

// Interface for extended request with file information
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Post route for handling file uploads
ImagesRouter.post(
  "/",
  upload.single("image"), // Handling the file upload
  async (req: Request, res: Response) => {
    const multerReq = req as MulterRequest;

    try {
      // Check if the file was uploaded
      if (!multerReq.file) {
        res.status(400).json({ error: "File not uploaded" });
        return;
      }

      // Accessing materiel_name
      const materielName = req.body.materiel_name;
      if (!materielName) {
        res.status(400).json({ error: "No materiel name provided" });
        return;
      }

      const fileName = multerReq.file.filename;
      console.warn("Uploaded file path:", fileName);

      res.status(200).json({
        success: "File uploaded",
        fileName,
        materielName,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  },
);

// Delete route for handling file deletion
ImagesRouter.delete("/:filename", async (req: Request, res: Response) => {
  const { filename } = req.params;
  try {
    const filePath = path.resolve(__dirname, "../../public", filename);
    console.warn("Deleting file:", filePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.status(200).json({ success: "File deleted" });
    } else {
      res.status(404).json({ error: "File not found" });
    }
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Get route for serving the file
ImagesRouter.get("/:filename", async (req: Request, res: Response) => {
  const { filename } = req.params;
  res.setHeader("Cache-Control", "no-store"); // This will prevent caching
  res.sendFile(path.join(__dirname, `../../public/${filename}`));
});

export default ImagesRouter;
