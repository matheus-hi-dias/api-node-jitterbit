import pool from '../config/db.js';
import * as repo from '../repositories/orderRepository.js';
import { mapOrderInput } from '../utils/index.js';

async function createOrder(data) {
  const order = mapOrderInput(data);
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await repo.createOrder(client, order);
    for (const item of order.items) {
      await repo.createItem(client, order.orderId, item);
    }

    await client.query('COMMIT');
    return order;
  } catch (err) {
    await client.query('ROLLBACK');
    if (err.code === '23505')
      throw new Error('Order with this ID already exists');
    throw err;
  } finally {
    client.release();
  }
}

async function getOrder(orderId) {
  const order = await repo.getOrderById(orderId);
  if (!order) throw new Error('Order not found');

  const items = await repo.getItemsByOrderId(orderId);
  return { ...order, items };
}

async function listOrders() {
  return repo.listOrders();
}

async function updateOrder(orderId, data) {
  const order = mapOrderInput(data);
  order.orderId = orderId;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const updatedRows = await repo.updateOrder(client, order);
    if (updatedRows === 0) throw new Error('Order not found');

    await repo.deleteItemsByOrderId(client, orderId);
    for (const item of order.items) {
      await repo.createItem(client, orderId, item);
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
  return repo.deleteOrder(orderId);
}

export { createOrder, getOrder, listOrders, updateOrder, deleteOrder };
