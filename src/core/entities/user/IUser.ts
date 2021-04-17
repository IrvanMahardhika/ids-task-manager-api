import IEntity from '../IEntity';

export default interface IUser extends IEntity {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}
