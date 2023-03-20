import Service from './service';
import orderModel, { OrderModel } from '../models/order.model';
import Order from '../interfaces/order.interface';

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

  validateOrder = ({ productsIds }: Order) => {
    if (!productsIds) throw new Error('"productsIds" is required');
    if (!Array.isArray(productsIds)) throw new Error('"productsIds" must be an array');
    const cond = !productsIds.every((e) => typeof e === 'number') || productsIds.length === 0;
    const errorMessage = '"productsIds" must include only numbers';
    if (cond) throw new Error(errorMessage);
  };

  insertOrder = async (order: Order, userId: string | number) => {
    this.validateOrder(order);
    const result = await this.model.insertOrder(order, Number(userId));
    return result;
  };
}

const orderService = new OrderService();

export default orderService;