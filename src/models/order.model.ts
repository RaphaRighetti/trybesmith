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
}

const orderModel = new OrderModel();

export default orderModel;