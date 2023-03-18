import userModel from '../models/user.model';
import Service from './service';
import { generateToken } from '../auth/jwt';

interface User {
  [key: string]: number | string;
  username: string,
  vocation: string,
  level: number,
  password: string,
}

interface UserWithId extends User {
  id: number
}

export class UserService extends Service {
  constructor() {
    super('users', ['username', 'vocation', 'level', 'password']);
    this.model = userModel;
  }

  newUser = async (userEntity: User) => {
    Service.validateKeys(this.expectedKeys, userEntity);
    const result = await this.model.insertInto(userEntity);
    const { password, ...payload } = result as UserWithId;
    const token = generateToken(payload);
    return { token };
  };
}

const userService = new UserService();

export default userService;