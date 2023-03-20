import { Request, Response } from 'express';
import Product from '../interfaces/product.interface';
import productService, { ProductService } from '../services/product.service';
import Controller from './controller';

class ProductController extends Controller {
  service: ProductService;

  constructor() {
    super('products');
    this.service = productService;
  }

  insertIntoValidation = async (req: Request, res: Response) => {
    try {
      const product = req.body as Product;
      const response = await this.service.insertIntoValidation(product);
      res.status(201).json(response);
    } catch (err) {
      const { message } = err as Error;
      const statusCode = message.includes('required') ? 400 : 422;
      res.status(statusCode).json({ message });
    }
  };
}

const productController = new ProductController();

export default productController;