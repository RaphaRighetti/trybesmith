import { Request, Response } from 'express';
import userService, { UserService } from '../services/user.service';
import Controller from './controller';

class UserController extends Controller {
  service: UserService;

  constructor() {
    super('users');
    this.service = userService;
  }

  newUser = async (req: Request, res: Response) => {
    const user = req.body;
    const result = await this.service.newUser(user);
    res.status(201).json(result);
  };
}

const userController = new UserController();

export default userController;