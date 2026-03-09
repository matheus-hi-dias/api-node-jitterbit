import * as service from '../services/orderService.js';

async function storeOrder(req, res) {
  try {
    const order = await service.createOrder(req.body);

    return res.status(201).json(order);
  } catch (err) {
    if (err.message === 'Order with this ID already exists') {
      return res.status(409).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
}

async function indexOrder(req, res) {
  try {
    const order = await service.getOrder(req.params.id);
    return res.json(order);
  } catch (err) {
    if (err.message === 'Order not found') {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
}

async function showOrders(req, res) {
  const orders = await service.listOrders();

  res.json(orders);
}

async function updateOrder(req, res) {
  try {
    const order = await service.updateOrder(req.params.id, req.body);
    return res.json(order);
  } catch (err) {
    if (err.message === 'Order not found') {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
}

async function removeOrder(req, res) {
  await service.deleteOrder(req.params.id);

  res.status(204).send();
}

export { storeOrder, indexOrder, showOrders, updateOrder, removeOrder };
