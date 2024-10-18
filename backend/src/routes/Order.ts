import { Router } from "express";
import { sqlRun } from "../db/sqlCodes/db";

const OrderRouter = Router();

// Get all orders
OrderRouter.get('/all', async (req, res) => {
  try {
    const data = await sqlRun("SELECT * FROM orders;");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'error:/all' });
  }
});

// Create a new order
OrderRouter.post('/new', async (req, res) => {
  const { userid } = req.body;
  try {
    await sqlRun("INSERT INTO orders (user_id) VALUES ($1);", [userid]);
    res.status(201).json({ success: 'success:/new' });
  } catch (error) {
    res.status(500).json({ error: 'error:/new' });
  }
});

// Add materials to an order
OrderRouter.post("/add", async (req, res) => {
  const { orderid, materielid, qte } = req.body;
  try {
    await sqlRun("INSERT INTO order_materiel (order_id, materiel_id, materiel_qte) VALUES ($1, $2, $3);", [orderid, materielid, qte]);
    res.status(201).json({ success: 'success:/add' });
  } catch (error) {
    res.status(500).json({ error: 'error:/add' });
  }
});

// Update material qte in an order
OrderRouter.put("/update", async (req, res) => {
  const { orderid, materielid, qte } = req.body;
  try {
    await sqlRun("UPDATE order_materiel SET materiel_qte = $3 WHERE order_id = $1 AND materiel_id = $2;", [orderid, materielid, qte]);
    res.status(200).json({ success: 'success:/update' });
  } catch (error) {
    res.status(500).json({ error: 'error:/update' });
  }
});

// Delete material from an order
OrderRouter.delete("/delete", async (req, res) => {
  const { orderid, materielid } = req.body;
  try {
    await sqlRun("DELETE FROM order_materiel WHERE order_id = $1 AND materiel_id = $2;", [orderid, materielid]);
    res.status(200).json({ success: 'success:/delete' });
  } catch (error) {
    res.status(500).json({ error: 'error:/delete' });
  }
});

// Get current orders for a user
OrderRouter.post("/current", async (req, res) => {
  const { userid } = req.body;
  try {
    const data = await sqlRun("SELECT * FROM orders WHERE user_id = $1 AND order_status = 'current';", [userid]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'error:/current' });
  }
});

// Send an order
OrderRouter.put("/send", async (req, res) => {
  const { orderid, begin_date, end_date, reason } = req.body;
  try {
    await sqlRun("UPDATE orders SET order_state = $1, begin_date = $2, end_date = $3, reason = $4 WHERE order_id = $5;",
      ["sent", begin_date, end_date, reason, orderid]);
    res.status(200).json({ success: 'success:/send' });
  } catch (error) {
    res.status(500).json({ error: 'error:/send' });
  }
});

// Get orders for a specific user
OrderRouter.get("/:user", async (req, res) => {
  const { user } = req.params;
  try {
    const data = await sqlRun("SELECT * FROM orders WHERE user_id = $1 AND order_state != 'pending';", [user]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'error:/:user' });
  }
});

export default OrderRouter;
