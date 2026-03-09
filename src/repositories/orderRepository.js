import pool from '../config/db.js';

async function createOrder(client, order) {
  await client.query(
    'INSERT INTO "Order"("orderId", "value", "creationDate") VALUES ($1, $2, $3)',
    [order.orderId, order.value, order.creationDate],
  );
}

async function createItem(client, orderId, item) {
  await client.query(
    'INSERT INTO "Items"("orderId", "productId", "quantity", "price") VALUES ($1, $2, $3, $4)',
    [orderId, item.productId, item.quantity, item.price],
  );
}

async function getOrderById(orderId) {
  const result = await pool.query(
    'SELECT * FROM "Order" WHERE "orderId" = $1',
    [orderId],
  );
  return result.rows[0] || null;
}

async function getItemsByOrderId(orderId) {
  const result = await pool.query(
    'SELECT * FROM "Items" WHERE "orderId" = $1',
    [orderId],
  );
  return result.rows;
}

async function listOrders() {
  const result = await pool.query('SELECT * FROM "Order"');
  return result.rows;
}

async function updateOrder(client, order) {
  const result = await client.query(
    'UPDATE "Order" SET "value" = $1, "creationDate" = $2 WHERE "orderId" = $3',
    [order.value, order.creationDate, order.orderId],
  );
  return result.rowCount;
}

async function deleteItemsByOrderId(client, orderId) {
  await client.query('DELETE FROM "Items" WHERE "orderId" = $1', [orderId]);
}

async function deleteOrder(orderId) {
  await pool.query('DELETE FROM "Order" WHERE "orderId" = $1', [orderId]);
}

export {
  createOrder,
  createItem,
  getOrderById,
  getItemsByOrderId,
  listOrders,
  updateOrder,
  deleteItemsByOrderId,
  deleteOrder,
};
