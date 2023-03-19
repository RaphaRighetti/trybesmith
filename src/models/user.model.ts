import { UserWithId } from '../interfaces/user.interface';
import connection from './connection';
import Model from './model';

export class UserModel extends Model {
  constructor() {
    super('users');
  }

  findByUsername = async (username: string) => {
    const result = await connection.execute(
      'SELECT * FROM Trybesmith.users WHERE username = ? ',
      [username],
    );
    const [rows] = result;
    const [user] = rows as UserWithId[];
    if (!user) throw new Error('Username or password invalid');
    return user;
  };
}

const userModel = new UserModel();

export default userModel;