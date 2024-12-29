import { Router } from "express";
import { sqlRun } from "../db/db";
import { testNumber } from "../checks";

const OrderRouter = Router();

// Get all orders V
OrderRouter.get("/all", async (req, res) => {
  try {
    const data = await sqlRun(
      "SELECT DISTINCT orders.order_id, orders.begin_date, orders.return_date, users.name , orders.reason, orders.order_state FROM orders JOIN users ON users.user_id = orders.user_id JOIN order_item ON order_item.order_id = orders.order_id;",
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// update order items after accept
OrderRouter.patch("/admin/accept/:orderid", async (req, res) => {
  const { orderid } = req.params;

  // get all items in the order
  const items = await sqlRun(
    "SELECT materiel_id, qte FROM order_item WHERE order_id = $1;",
    [orderid],
  );

  for (const item of items.rows) {
    console.log(item);
    // get the current quantity of the material
    const currentQte = await sqlRun(
      "SELECT materiel_qte FROM materiel WHERE materiel_id = $1;",
      [item.materiel_id],
    );

    console.log(currentQte.rows[0]);
    // update the quantity
    await sqlRun(
      "UPDATE materiel SET materiel_qte = $1 WHERE materiel_id = $2;",
      [currentQte.rows[0].materiel_qte - item.qte, item.materiel_id],
    );
  }

  res.status(200).json({ success: "success:/admin/accept" });
  try {
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

OrderRouter.patch("/admin/return/:orderid", async (req, res) => {
  const { orderid } = req.params;

  // get all items in the order
  const items = await sqlRun(
    "SELECT materiel_id, qte FROM order_item WHERE order_id = $1;",
    [orderid],
  );

  for (const item of items.rows) {
    console.log(item);
    // get the current quantity of the material
    const currentQte = await sqlRun(
      "SELECT materiel_qte FROM materiel WHERE materiel_id = $1;",
      [item.materiel_id],
    );

    console.log(currentQte.rows[0]);
    // update the quantity
    await sqlRun(
      "UPDATE materiel SET materiel_qte = $1 WHERE materiel_id = $2;",
      [currentQte.rows[0].materiel_qte + item.qte, item.materiel_id],
    );
  }

  res.status(200).json({ success: "success:/admin/return" });
  try {
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// Create a new order V
OrderRouter.post("/new", async (req, res) => {
  const { userid } = req.body;
  testNumber(userid);
  try {
    const current = await sqlRun(
      "SELECT * FROM orders WHERE user_id = $1 AND order_state = 'current';",
      [userid],
    );

    const user = await sqlRun(
      "SELECT count(*) FROM users WHERE user_id = $1;",
      [userid],
    );
    console.log(user);
    if (current.rows.length != 0) {
      res.status(409).json({ error: "account already has an order" });
      return;
    }
    if (user.rows[0].count == 0) {
      res.status(404).json({ error: "user not found" });
      return;
    }

    await sqlRun("INSERT INTO orders (user_id,order_state) VALUES ($1,$2);", [
      userid,
      "current",
    ]);
    res.status(201).json({ success: "success:/new" });
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
    await sqlRun(
      "INSERT INTO order_item (order_id, materiel_id,qte) VALUES ($1, $2, $3);",
      [orderid, materielid, qte],
    );
    res.status(201).json({ success: "success:/add" });
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
    await sqlRun(
      "UPDATE order_item SET qte = $3 WHERE order_id = $1 AND materiel_id = $2;",
      [orderid, materielid, qte],
    );
    res.status(200).json({ success: "success:/update" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// test if the cart can be accepted
OrderRouter.get("/admin/test-cart/:cart", async (req, res) => {
  const { cart } = req.params;
  try {
    const data = await sqlRun(
      "SELECT * FROM materiel as m , order_item as item  WHERE order_id = $1 and m.materiel_id = item.materiel_id and m.materiel_qte < item.qte;",
      [cart],
    );
    if (data.rows.length == 0) {
      res.status(200).json({ success: "success:/test-cart" });
    } else {
      res.status(400).json({ error: "insufficient quantity" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete material from an order V
OrderRouter.delete("/delete/:orderid/:materielid", async (req, res) => {
  const orderid = parseInt(req.params.orderid);
  const materielid = parseInt(req.params.materielid);

  testNumber(orderid);
  testNumber(materielid);
  try {
    await sqlRun(
      "DELETE FROM order_item WHERE order_id = $1 AND materiel_id = $2;",
      [orderid, materielid],
    );
    res.status(200).json({ success: "success:/delete" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get current orders for a user V
OrderRouter.get("/current", async (req, res) => {
  const { userid } = req.query;
  try {
    const data = await sqlRun(
      "SELECT * FROM orders WHERE user_id = $1 AND order_state = 'current';",
      [userid],
    );
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
    await sqlRun(
      "UPDATE orders SET order_state = $1, begin_date = $2, return_date = $3, reason = $4 WHERE order_id = $5;",
      ["pending", begin_date, return_date, reason, orderid],
    );
    res.status(200).json({ success: "success:/send" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get order qte for a specific materiel from a specific order
OrderRouter.get("/orderItem", async (req, res) => {
  const { currentOrder, materiel } = req.query;
  if (currentOrder === undefined || materiel === undefined) {
    res.status(400).json({ error: "missing query parameters" });
    return;
  }
  try {
    const data = await sqlRun(
      "SELECT qte FROM order_item WHERE order_id = $1 AND materiel_id = $2;",
      [currentOrder, materiel],
    );
    res.status(200).json(data.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// get materiel from a specific order
OrderRouter.get("/cart/list/:cartId", async (req, res) => {
  const { cartId } = req.params;
  try {
    const data = await sqlRun(
      "SELECT m.materiel_id,materiel_name,description,qte,materiel_qte FROM order_item as o,materiel as m WHERE order_id = $1 and m.materiel_id = o.materiel_id;",
      [cartId],
    );
    res.status(200).json(data.rows);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

type OrderData = {
  begin_date: Date;
  return_date: Date;
  order_state: string;
  reason: string;
  user_id: number;
};

type orderItem = {
  orderData: OrderData;
  items: { materiel_id: string; qte: number }[];
};
// change state of order
// states we have are ('current', 'pending', 'accepted', 'delivered', 'refused', 'returned')
OrderRouter.put("/admin", async (req, res) => {
  const { orderid, state } = req.body;
  try {
    await sqlRun(
      "UPDATE orders SET order_state = $1 WHERE order_id = $2;",
      [state, orderid],
    );
    res.status(200).json({ success: "success:/state" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get orders for a specific user
OrderRouter.get("/:user", async (req, res) => {
  const { user } = req.params;
  let Result: orderItem[] = [];

  try {
    // Fetch orders for the user
    const data = await sqlRun(
      "SELECT * FROM orders WHERE user_id = $1 AND order_state != 'current';",
      [user],
    );

    // Create an array of promises for order items
    const orderItemPromises = data.rows.map(async (order: any) => {
      const items = await sqlRun(
        "SELECT order_id,materiel_name,qte FROM order_item as o,materiel as m WHERE order_id = $1 and o.materiel_id = m.materiel_id;",
        [order.order_id],
      );

      const materielItems: { materiel_id: string; qte: number }[] = items.rows
        .map((item: any) => ({
          materiel_id: item.materiel_name,
          qte: item.qte,
        }));

      Result.push({
        orderData: {
          begin_date: order.begin_date,
          return_date: order.return_date,
          order_state: order.order_state,
          reason: order.reason,
          user_id: order.user_id,
        },
        items: materielItems,
      });
    });

    //estana el promises lkol
    await Promise.all(orderItemPromises);
    res.status(200).json(Result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// delete order
OrderRouter.delete("/delete/:orderid", async (req, res) => {
  const orderid = parseInt(req.params.orderid);
  testNumber(orderid);
  try {
    await sqlRun("DELETE FROM orders WHERE order_id = $1;", [orderid]);
    res.status(200).json({ success: "success:/delete" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get all orders for a specific user
OrderRouter.get("/user/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    const data = await sqlRun(
      "SELECT * FROM orders WHERE user_id = $1;",
      [userid],
    );
    res.status(200).json(data.rows);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default OrderRouter;
