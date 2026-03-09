import * as service from '../services/orderService.js';
import { catchAsync } from '../utils/handler.js';

export const storeOrder = catchAsync(async (req, res) => {
  const order = await service.createOrder(req.body);
  res.status(201).json(order);
});

export const indexOrder = catchAsync(async (req, res) => {
  const order = await service.getOrder(req.params.id);
  res.json(order);
});

export const showOrders = catchAsync(async (req, res) => {
  const orders = await service.listOrders();
  res.json(orders);
});

export const updateOrder = catchAsync(async (req, res) => {
  const order = await service.updateOrder(req.params.id, req.body);
  res.json(order);
});

export const removeOrder = catchAsync(async (req, res) => {
  await service.deleteOrder(req.params.id);
  res.status(204).send();
});
