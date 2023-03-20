import express from 'express';
import productController from '../controllers/product.controller';

const Route = express.Router();

Route.post('/', productController.insertIntoValidation);
Route.get('/', productController.getAll);

export default Route;