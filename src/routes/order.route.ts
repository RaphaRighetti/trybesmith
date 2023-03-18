import express from 'express';
import orderController from '../controllers/order.controller';

const route = express.Router();

route.get('/', orderController.getOrders);

export default route;