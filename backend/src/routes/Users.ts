import { Router } from "express";
import { sqlRun } from "../db/sqlCodes/db";

const UserRouter = Router();

UserRouter.get('/all', async (req, res) => {
  res.send(await sqlRun("select * from users;"));
});

UserRouter.post("Login", async (req, res) => {
  const { email, password } = req.body;
  const data: any = await sqlRun("select user_id,password from users where email = $1;", [email]);
  if (data.length == 0) {
    res.send("-2");
    return;
  }
  if (data[0].password != password) {
    res.send("-1");
    return;
  }

  if (data[0].password == password) {
    res.send(data[0].user_id);
  }
})

export default UserRouter;
