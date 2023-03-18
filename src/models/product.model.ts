import Model from './model';

class ProductModel extends Model {
  constructor() {
    super('products');
  }
}

const productModel = new ProductModel();

export default productModel;