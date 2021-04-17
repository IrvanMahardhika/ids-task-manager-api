import User from '@core/entities/user/User';
import IRepository from '../IRepository';

export default interface IUserRepository extends IRepository<User> {}
