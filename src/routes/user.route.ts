import express from 'express';
import userController from '../controllers/user.controller';

const Route = express.Router();

Route.post('/', userController.newUser);
Route.get('/', userController.getAll);

export default Route;