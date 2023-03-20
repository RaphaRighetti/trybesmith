import { ResultSetHeader } from 'mysql2';
import Order from '../interfaces/order.interface';
import connection from './connection';
import Model from './model';

export class OrderModel extends Model {
  constructor() {
    super('orders');
  }

  getOrders = async () => {
    const [result] = await connection.execute(
      `SELECT a.id, a.user_id as userId, JSON_ARRAYAGG(b.id) as productsIds FROM
      Trybesmith.orders a INNER JOIN Trybesmith.products b
      WHERE a.id = b.order_id
      GROUP BY a.id;`,
    );
    return result;
  };

  insertOrder = async ({ productsIds }: Order, userId: number | string) => {
    const [{ insertId }] = await connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.orders (user_id) VALUES (?)',
      [userId],
    );
    const attProducts = productsIds.map(async (e) => connection.execute(
      'UPDATE Trybesmith.products SET order_id = ? WHERE id = ?',
      [insertId, e],
    ));
    await Promise.all(attProducts);
    return { userId, productsIds };
  };
}

const orderModel = new OrderModel();

export default orderModel;