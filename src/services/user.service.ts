import userModel, { UserModel } from '../models/user.model';
import Service from './service';
import { generateToken } from '../auth/jwt';
import { Login, User, UserWithId } from '../interfaces/user.interface';

export class UserService extends Service {
  model: UserModel;

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

  validateLogin = async ({ username, password }: Login) => {
    if (!username) throw new Error('"username" is required');
    if (!password) throw new Error('"password" is required');
    const result = await this.model.findByUsername(username);
    if (password !== result.password) throw new Error('Username or password invalid');
    return result;
  };

  login = async ({ username, password }: Login) => {
    const result = await this.validateLogin({ username, password });
    const payload = { id: result.id, username: result.username };
    const token = generateToken(payload);
    return { token };
  };
}

const userService = new UserService();

export default userService;