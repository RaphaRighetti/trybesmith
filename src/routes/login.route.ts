import express from 'express';
import userController from '../controllers/user.controller';

const route = express.Router();
route.post('/', userController.login);

export default route;