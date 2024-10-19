import { Router } from "express";
import { sqlRun } from "../db/db";

const UserRouter = Router();

UserRouter.get('/all', async (req, res) => {
  res.send(await sqlRun("select * from users;"));
});

UserRouter.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  const data: any = await sqlRun("select user_id,password from users where email = $1;", [email]);

  if (data.rows.length === 0) {
    res.status(404).json("-2");
    return;
  }
  if (data.rows[0].password != password) {
    res.status(401).json("-1");
    return;
  }
  if (data.rows[0].password == password) {
    res.status(200).json(data.rows[0].user_id);
    return
  }
})

export default UserRouter;
