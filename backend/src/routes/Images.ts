import { Request, Response, Router } from "express";
import multer from "multer";
import path from "path";

const ImagesRouter = Router();

// Configure multer storage to preserve original file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/"); // Folder where images will be saved
  },
  filename: (req, file, cb) => {
    // Keep the original file name
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Define TypeScript interface for Multer file
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

ImagesRouter.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const multerReq = req as MulterRequest;

    try {
      // Check if the file was uploaded
      if (!multerReq.file) {
        res.status(400).json({ error: "File not uploaded" });
        return;
      }

      const fileName = multerReq.file.filename;
      console.warn("Uploaded file path:", fileName);

      res.status(200).json({
        success: "File uploaded",
        fileName,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  },
);

ImagesRouter.get("/:filename", async (req: Request, res: Response) => {
  const { filename } = req.params;
  res.sendFile(path.join(__dirname, `../../public/${filename}`));
});

export default ImagesRouter;
