import { Router } from "express";
import { sqlRun } from "../db/db";
import { testNumber } from "../checks";
import { parse } from "dotenv";

const OrderRouter = Router();

// Get all orders V
OrderRouter.get('/all', async (req, res) => {
  try {
    const data = await sqlRun("SELECT * FROM orders;");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//TODO: create a function that test api result based on type

// Create a new order V
OrderRouter.post('/new', async (req, res) => {
  const { userid } = req.body;
  testNumber(userid);
  try {
    const current = await sqlRun("SELECT * FROM orders WHERE user_id = $1 AND order_state = 'current';", [userid]);


    const user = await sqlRun("SELECT count(*) FROM users WHERE user_id = $1;", [userid]);
    console.log(user)
    if (current.rows.length != 0) {
      res.status(409).json({ error: "account already has an order" });
      return;
    }
    if (user.rows[0].count == 0) {
      res.status(404).json({ error: "user not found" });
      return;
    }

    await sqlRun("INSERT INTO orders (user_id,order_state) VALUES ($1,$2);", [userid, "current"]);
    res.status(201).json({ success: 'success:/new' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Add materials to an order V
OrderRouter.post("/add", async (req, res) => {
  const { orderid, materielid, qte } = req.body;

  testNumber(qte);
  testNumber(orderid);
  testNumber(materielid);

  try {
    await sqlRun("INSERT INTO order_item (order_id, materiel_id,qte) VALUES ($1, $2, $3);", [orderid, materielid, qte]);
    res.status(201).json({ success: 'success:/add' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Update material qte in an order V
OrderRouter.put("/update", async (req, res) => {
  const { orderid, materielid, qte } = req.body;

  testNumber(qte);
  testNumber(orderid);
  testNumber(materielid);

  try {
    await sqlRun("UPDATE order_item SET qte = $3 WHERE order_id = $1 AND materiel_id = $2;", [orderid, materielid, qte]);
    res.status(200).json({ success: 'success:/update' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete material from an order V
OrderRouter.delete("/delete/:orderid/:materielid", async (req, res) => {

  const orderid = parseInt(req.params.orderid)
  const materielid = parseInt(req.params.materielid)

  testNumber(orderid);
  testNumber(materielid);
  try {
    await sqlRun("DELETE FROM order_item WHERE order_id = $1 AND materiel_id = $2;", [orderid, materielid]);
    res.status(200).json({ success: 'success:/delete' });
  } catch (error) {

    res.status(500).json({ error: error });
  }
});

// Get current orders for a user V
OrderRouter.get("/current", async (req, res) => {
  const { userid } = req.query;
  try {
    const data = await sqlRun("SELECT * FROM orders WHERE user_id = $1 AND order_state = 'current';", [userid]);
    res.status(200).json(data.rows[0]);
  } catch (error) {

    res.status(500).json({ error: error });
  }
});

// Send an order V
OrderRouter.put("/send", async (req, res) => {
  const { orderid, begin_date, return_date, reason } = req.body;
  testNumber(orderid);
  try {
    await sqlRun("UPDATE orders SET order_state = $1, begin_date = $2, return_date = $3, reason = $4 WHERE order_id = $5;",
      ["pending", begin_date, return_date, reason, orderid]);
    res.status(200).json({ success: 'success:/send' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

OrderRouter.get("/orderItem", async (req, res) => {
  const { currentOrder, materiel } = req.query;
  if (currentOrder === undefined || materiel === undefined) {
    res.status(400).json({ error: "missing query parameters" });
    return;
  }
  try {
    const data = await sqlRun(
      "SELECT qte FROM order_item WHERE order_id = $1 AND materiel_id = $2;",
      [currentOrder, materiel]
    );
    res.status(200).json(data.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});



// Get orders for a specific user V
OrderRouter.get("/:user", async (req, res) => {
  const { user } = req.params;
  try {
    const data = await sqlRun("SELECT * FROM orders WHERE user_id = $1 AND order_state != 'pending';", [user]);
    res.status(200).json(data.rows);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});




export default OrderRouter;
