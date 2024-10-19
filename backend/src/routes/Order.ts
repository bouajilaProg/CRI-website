import { Router } from "express";
import { sqlRun } from "../db/db";

const OrderRouter = Router();

// Get all orders V
OrderRouter.get('/all', async (req, res) => {
  try {
    const data = await sqlRun("SELECT * FROM orders;");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'error:/all' });
  }
});

// Create a new order V
OrderRouter.post('/new', async (req, res) => {
  const { userid } = req.body;
  try {
    await sqlRun("INSERT INTO orders (user_id) VALUES ($1);", [userid]);
    res.status(201).json({ success: 'success:/new' });
  } catch (error) {
    res.status(500).json({ error: 'error:/new' });
  }
});

// Add materials to an order V
OrderRouter.post("/add", async (req, res) => {
  const { orderid, materielid, qte } = req.body;
  try {
    await sqlRun("INSERT INTO order_item (order_id, materiel_id,qte) VALUES ($1, $2, $3);", [orderid, materielid, qte]);
    res.status(201).json({ success: 'success:/add' });
  } catch (error) {
    res.status(500).json({ error: 'error:/add' });
  }
});

// Update material qte in an order V
OrderRouter.put("/update", async (req, res) => {
  const { orderid, materielid, qte } = req.body;
  try {
    await sqlRun("UPDATE order_item SET qte = $3 WHERE order_id = $1 AND materiel_id = $2;", [orderid, materielid, qte]);
    res.status(200).json({ success: 'success:/update' });
  } catch (error) {
    res.status(500).json({ error: 'error:/update' });
  }
});

// Delete material from an order V
OrderRouter.delete("/delete", async (req, res) => {
  const { orderid, materielid } = req.body;
  try {
    await sqlRun("DELETE FROM order_item WHERE order_id = $1 AND materiel_id = $2;", [orderid, materielid]);
    res.status(200).json({ success: 'success:/delete' });
  } catch (error) {
    res.status(500).json({ error: 'error:/delete' });
  }
});

// Get current orders for a user V
OrderRouter.post("/current", async (req, res) => {
  const { userid } = req.body;
  try {
    const data = await sqlRun("SELECT * FROM orders WHERE user_id = $1 AND order_state = 'current';", [userid]);
    res.status(200).json(data.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'error:/current' });
  }
});

// Send an order V
OrderRouter.put("/send", async (req, res) => {
  const { orderid, begin_date, return_date, reason } = req.body;
  try {
    await sqlRun("UPDATE orders SET order_state = $1, begin_date = $2, return_date = $3, reason = $4 WHERE order_id = $5;",
      ["pending", begin_date, return_date, reason, orderid]);
    res.status(200).json({ success: 'success:/send' });
  } catch (error) {
    res.status(500).json({ error: 'error:/send' });
  }
});

// Get orders for a specific user V
OrderRouter.get("/:user", async (req, res) => {
  const { user } = req.params;
  try {
    const data = await sqlRun("SELECT * FROM orders WHERE user_id = $1 AND order_state != 'pending';", [user]);
    res.status(200).json(data.rows);
  } catch (error) {
    res.status(500).json({ error: 'error:/:user' });
  }
});

export default OrderRouter;
