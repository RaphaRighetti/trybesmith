import express from 'express';
import productController from '../controllers/product.controller';

const Route = express.Router();

Route.post('/', productController.insertInto);
Route.get('/', productController.getAll);

export default Route;