import * as repo from '../repositories/orderRepository.js';
import { mapOrderInput } from '../utils/index.js';

async function createOrder(data) {
  const order = mapOrderInput(data);

  return repo.createOrder(order);
}

async function getOrder(orderId) {
  const order = await repo.getOrderById(orderId);

  if (!order) {
    throw new Error('Order not found');
  }

  return order;
}

async function listOrders() {
  return repo.listOrders();
}

async function updateOrder(orderId, data) {
  const order = mapOrderInput(data);
  order.orderId = orderId;
  return repo.updateOrder(order);
}

async function deleteOrder(orderId) {
  return repo.deleteOrder(orderId);
}

export { createOrder, getOrder, listOrders, updateOrder, deleteOrder };
