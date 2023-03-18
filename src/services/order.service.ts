import Service from './service';
import orderModel, { OrderModel } from '../models/order.model';

export class OrderService extends Service {
  model: OrderModel;

  constructor() {
    super('orders', ['id', 'user_id']);
    this.model = orderModel;
  }

  getOrders = async () => {
    try {
      const result = await this.model.getOrders();
      return result;
    } catch (err) {
      console.log(err);
    }
  };
}

const orderService = new OrderService();

export default orderService;