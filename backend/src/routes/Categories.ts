import { Router } from "express";
import { sqlRun } from "../db/db";

const categoriesRouter = Router();

categoriesRouter.get("/all", async (req, res) => {
  try {
    const data: any = await sqlRun("select * from category;");
    res.status(200).send(data.rows);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default categoriesRouter;
