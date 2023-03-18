import Model from './model';

class UserModel extends Model {
  constructor() {
    super('users');
  }
}

const userModel = new UserModel();

export default userModel;