import { Router } from 'express';
import { healthCheck } from '../controllers/healthController.js';
import * as orderController from '../controllers/orderController.js';
import * as authController from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Rotas Públicas
router.get('/health', healthCheck);
router.post('/register', authController.register);
router.post('/login', authController.login);

// Middleware de autenticação
router.use(authenticateToken);
// Rotas privadas
router.post('/order', orderController.storeOrder);
router.get('/order/list', orderController.showOrders);
router.get('/order/:id', orderController.indexOrder);
router.put('/order/:id', orderController.updateOrder);
router.delete('/order/:id', orderController.removeOrder);

export default router;
