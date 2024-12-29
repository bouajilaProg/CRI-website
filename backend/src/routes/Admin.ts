import { Router } from "express";
import { sqlRun } from "../db/db";

const MaterielRouter = Router();

MaterielRouter.get("categories", async (req, res) => {
  try {
    res.send(await sqlRun("select * from categories;"));
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default MaterielRouter;
