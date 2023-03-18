import { Response } from 'express';
import { Request } from 'express-serve-static-core';
import orderService, { OrderService } from '../services/order.service';
import Controller from './controller';

class OrderController extends Controller {
  service: OrderService;

  constructor() {
    super('orders');
    this.service = orderService;
  }

  getOrders = async (_req: Request, res: Response) => {
    const result = await this.service.getOrders();
    res.status(200).json(result);
  };
}

const orderController = new OrderController();

export default orderController;