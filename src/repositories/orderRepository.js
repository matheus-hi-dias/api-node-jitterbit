import pool from '../config/db.js';

async function createOrder(order) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(
      `INSERT INTO "Order"("orderId","value","creationDate")
       VALUES ($1,$2,$3)`,
      [order.orderId, order.value, order.creationDate],
    );

    for (const item of order.items) {
      await client.query(
        `INSERT INTO "Items"("orderId","productId","quantity","price")
         VALUES ($1,$2,$3,$4)`,
        [order.orderId, item.productId, item.quantity, item.price],
      );
    }

    await client.query('COMMIT');

    return order;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

async function getOrderById(orderId) {
  const order = await pool.query(`SELECT * FROM "Order" WHERE "orderId"=$1`, [
    orderId,
  ]);

  const items = await pool.query(`SELECT * FROM "Items" WHERE "orderId"=$1`, [
    orderId,
  ]);

  return {
    ...order.rows[0],
    items: items.rows,
  };
}

async function listOrders() {
  const result = await pool.query(`SELECT * FROM "Order"`);

  return result.rows;
}

async function updateOrder(order) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      `UPDATE "Order" SET "value"=$1, "creationDate"=$2 WHERE "orderId"=$3`,
      [order.value, order.creationDate, order.orderId],
    );
    await client.query(`DELETE FROM "Items" WHERE "orderId"=$1`, [
      order.orderId,
    ]);
    for (const item of order.items) {
      await client.query(
        `INSERT INTO "Items"("orderId","productId","quantity","price") VALUES ($1,$2,$3,$4)`,
        [order.orderId, item.productId, item.quantity, item.price],
      );
    }
    await client.query('COMMIT');
    return order;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

async function deleteOrder(orderId) {
  await pool.query(`DELETE FROM "Order" WHERE "orderId"=$1`, [orderId]);
}

export { createOrder, getOrderById, listOrders, updateOrder, deleteOrder };
