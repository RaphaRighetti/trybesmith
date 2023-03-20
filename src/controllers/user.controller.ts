import { Request, Response } from 'express';
import { User } from '../interfaces/user.interface';
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

  login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const token = await this.service.login({ username, password });
      res.status(200).json(token);
    } catch (err) {
      const { message } = err as Error;
      const statusCode = message.includes('required') ? 400 : 401;
      res.status(statusCode).json({ message });
    }
  };

  insertIntoValidate = async (req: Request, res: Response) => {
    try {
      const user = req.body as User;
      const result = await this.service.insertIntoValidate(user);
      res.status(201).json(result);
    } catch (err) {
      const { message } = err as Error;
      const statusCode = message.includes('required') ? 400 : 422;
      res.status(statusCode).json({ message });
    }
  };
}

const userController = new UserController();

export default userController;