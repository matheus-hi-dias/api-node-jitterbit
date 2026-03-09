import { Router } from 'express';
import { healthCheck } from '../controllers/healthController.js';
import {
  indexOrder,
  removeOrder,
  showOrders,
  storeOrder,
  updateOrder,
} from '../controllers/orderController.js';

const router = Router();

router.get('/health', healthCheck);

router.post('/order', storeOrder);
router.get('/order/list', showOrders);
router.get('/order/:id', indexOrder);
router.put('/order/:id', updateOrder);
router.delete('/order/:id', removeOrder);

export default router;
