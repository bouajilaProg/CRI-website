import { Router } from "express";
import { sqlRun } from "../db/db";
import { testNumber } from "../checks";

const UserRouter = Router();

UserRouter.get('/all', async (req, res) => {
  res.send(await sqlRun("select * from users;"));
});



UserRouter.post("/Login", async (req, res) => {
  try {

    const { email, password } = req.body;
    const data: any = await sqlRun("select user_id,password from users where email = $1;", [email]);

    if (email === undefined || password === undefined) {
      throw new Error("Email or password is missing");
    }

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
  } catch (error) {
    res.status(500).json({ error: error });
  }
})



UserRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  testNumber(parseInt(id));
  try {
    const data = await sqlRun("SELECT * FROM users WHERE user_id = $1;", [id]);
    if (data.rows.length === 0) {
      res.status(404).json({ error: "user not found" });
      return;
    }
    res.status(200).json(data.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
export default UserRouter;
