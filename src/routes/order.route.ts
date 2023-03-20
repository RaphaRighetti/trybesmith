import express from 'express';
import orderController from '../controllers/order.controller';
import verifyTokenMiddleware from '../middlewares/verifyToken.middleware';

const route = express.Router();

route.get('/', orderController.getOrders);
route.post('/', verifyTokenMiddleware, orderController.insertOrder);

export default route;