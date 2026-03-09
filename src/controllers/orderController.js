import * as service from '../services/orderService.js';

async function storeOrder(req, res) {
  try {
    const order = await service.createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    const status = err.message.includes('already exists') ? 409 : 500;
    res.status(status).json({ error: err.message });
  }
}

async function indexOrder(req, res) {
  try {
    const order = await service.getOrder(req.params.id);
    res.json(order);
  } catch (err) {
    const status = err.message === 'Order not found' ? 404 : 500;
    res.status(status).json({ error: err.message });
  }
}

async function showOrders(req, res) {
  const orders = await service.listOrders();
  res.json(orders);
}

async function updateOrder(req, res) {
  try {
    const order = await service.updateOrder(req.params.id, req.body);
    res.json(order);
  } catch (err) {
    const status = err.message === 'Order not found' ? 404 : 500;
    res.status(status).json({ error: err.message });
  }
}

async function removeOrder(req, res) {
  await service.deleteOrder(req.params.id);
  res.status(204).send();
}

export { storeOrder, indexOrder, showOrders, updateOrder, removeOrder };
