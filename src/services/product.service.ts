import Product from '../interfaces/product.interface';
import productModel from '../models/product.model';
import Service from './service';

export class ProductService extends Service {
  constructor() {
    super('products', ['name', 'amount']);
    this.model = productModel;
  }

  verifyName = (name: string) => {
    if (!name) throw new Error('"name" is required');
    if (typeof name !== 'string') throw new Error('"name" must be a string');
    if (name.length < 3) throw new Error('"name" length must be at least 3 characters long');
  };

  verifyAmount = (amount: string) => {
    if (!amount) throw new Error('"amount" is required');
    if (typeof amount !== 'string') throw new Error('"amount" must be a string');
    if (amount.length < 3) throw new Error('"amount" length must be at least 3 characters long');
  };

  insertIntoValidation = async ({ name, amount }: Product) => {
    this.verifyName(name);
    this.verifyAmount(amount);
    const result = await this.insertInto({ name, amount });
    return result;
  };
}

const productService = new ProductService();

export default productService;