import productModel from '../models/product.model';
import Service from './service';

class ProductService extends Service {
  constructor() {
    super('products', ['name', 'amount']);
    this.model = productModel;
  }
}

const productService = new ProductService();

export default productService;