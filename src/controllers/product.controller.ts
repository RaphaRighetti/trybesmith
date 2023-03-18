import productService from '../services/product.service';
import Controller from './controller';

class ProductController extends Controller {
  constructor() {
    super('products');
    this.service = productService;
  }
}

const productController = new ProductController();

export default productController;