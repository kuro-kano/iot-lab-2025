import { Hono } from "hono";
import db from "../db/drizzle.js";
import { orders } from "../db/schema.js";
import { eq } from "drizzle-orm";

const app = new Hono();

// GET /orders - รับรายการ orders ทั้งหมด
app.get("/", async (c) => {
  const allOrders = await db.select().from(orders);
  return c.json(allOrders);
});

// POST /orders - สร้าง order ใหม่
app.post("/", async (c) => {
  const body = await c.req.json();
  
  // แปลงข้อมูลเครื่องดื่มให้เป็น string เพื่อเก็บใน database
  const menuDetail = {
    name: body.name,
    size: body.size,
    type: body.type,
    sweetness: body.sweetness,
    notes: body.notes
  };

  const newOrder = await db
    .insert(orders)
    .values({
      menu: JSON.stringify(menuDetail),
      quantity: body.quantity,
      price: body.totalPrice,
      status: "pending",
      ordered_at: Date.now(),
    })
    .returning();

  return c.json(newOrder[0]);
});

// PATCH /orders/:id/status - อัพเดทสถานะของ order
app.patch("/:id/status", async (c) => {
  const id = Number(c.req.param("id"));
  const { status } = await c.req.json();

  const updatedOrder = await db
    .update(orders)
    .set({ status })
    .where(eq(orders.id, id))
    .returning();

  if (!updatedOrder.length) {
    return c.json({ error: "Order not found" }, 404);
  }

  return c.json(updatedOrder[0]);
});

export default app;
