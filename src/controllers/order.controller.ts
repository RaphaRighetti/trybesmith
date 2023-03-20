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

  insertOrder = async (req: Request, res: Response) => {
    try {
      const { payload, ...order } = req.body;
      const result = await this.service.insertOrder(order, payload.id);
      res.status(201).json(result);
    } catch (err) {
      const { message } = err as Error;
      const statusCode = message.includes('required') ? 400 : 422;
      res.status(statusCode).json({ message });
    }
  };
}

const orderController = new OrderController();

export default orderController;