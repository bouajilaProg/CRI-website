//imports
import express, { Request, Response } from "express";
import dotenv from "dotenv";

//setup
const app = express();
app.use(express.urlencoded({ extended: true })); // For forms
app.use(express.json());
const PORT = process.env.PORT || 4000;
const cors = require("cors");

//import routes
import UserRouter from "./routes/Users";
import MaterielRouter from "./routes/Materiel";
import OrderRouter from "./routes/Order";
import categoriesRouter from "./routes/Categories";
import ImagesRouter from "./routes/Images";
import path from "path";

dotenv.config();
app.use(cors([
  {
    origin: "http://localhost:5132",
    credentials: true,
  },
  {
    origin: "*",
    credentials: true,
  },
]));

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/users", UserRouter);
app.use("/materiel", MaterielRouter);
app.use("/order", OrderRouter);
app.use("/categories", categoriesRouter);
app.use("/images", ImagesRouter);

//run the server
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
