import express from 'express';
import userController from '../controllers/user.controller';

const Route = express.Router();

Route.post('/', userController.insertIntoValidate);
Route.get('/', userController.getAll);

export default Route;