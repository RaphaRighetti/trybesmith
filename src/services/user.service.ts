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

  verifyField = (field: string, fieldString: string) => {
    if (!field) throw new Error(`"${fieldString}" is required`);
    if (typeof field !== 'string') throw new Error(`"${fieldString}" must be a string`);
    const errorMessage = `"${fieldString}" length must be at least 3 characters long`;
    if (field.length < 3) throw new Error(errorMessage);
  };

  verifyLevel = (level: number) => {
    if (level < 1) throw new Error('"level" must be greater than or equal to 1');
    if (!level) throw new Error('"level" is required');
    if (typeof level !== 'number') throw new Error('"level" must be a number');
  };

  verifyPassword = (password: string) => {
    if (!password) throw new Error('"password" is required');
    if (typeof password !== 'string') throw new Error('"password" must be a string');
    const errorMessage = '"password" length must be at least 8 characters long';
    if (password.length < 8) throw new Error(errorMessage);
  };

  insertIntoValidate = async ({ username, vocation, level, password }: User) => {
    this.verifyField(username, 'username');
    this.verifyField(vocation, 'vocation');
    this.verifyLevel(level);
    this.verifyPassword(password);
    const result = await this.newUser({ username, vocation, level, password });
    return result;
  };
}

const userService = new UserService();

export default userService;