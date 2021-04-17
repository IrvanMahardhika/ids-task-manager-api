import IUser from './IUser';

export default class User implements IUser {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}
