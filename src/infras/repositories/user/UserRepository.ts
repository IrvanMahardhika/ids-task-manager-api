import { Transaction } from 'sequelize';
import User from '@core/entities/user/User';
import IUserRepository from '@core/repositories/user/IUserRepository';
import IRepositoryOptions, {
  WhereOptions,
} from '@core/repositories/IRepositoryOptions';
import models from '@infras/database/sequelize/models';
import { repositoryOptionConverter } from '../helpers';

const { User: UserModel } = models;

export default class UserRepository implements IUserRepository {
  private transaction: Transaction;

  setTransaction(transaction: Transaction): void {
    this.transaction = transaction;
  }

  async findOne(options?: IRepositoryOptions): Promise<User> {
    const sequelizeOptions = repositoryOptionConverter(options!);
    const onlineCourse = await UserModel.findOne({
      ...sequelizeOptions,
      transaction: this.transaction,
    });

    return onlineCourse && onlineCourse.get({ plain: true });
  }

  async findAll(options?: IRepositoryOptions): Promise<User[]> {
    const sequelizeOptions = repositoryOptionConverter(options!);
    const onlineCourses = await UserModel.findAll({
      ...sequelizeOptions,
      transaction: this.transaction,
    });

    return (
      onlineCourses &&
      onlineCourses.map((onlineCourse) => onlineCourse.get({ plain: true }))
    );
  }

  async create(entity: User): Promise<User> {
    const dataEntry = await UserModel.create(entity);
    return dataEntry;
  }

  async delete(options: WhereOptions): Promise<User> {
    const deletedId = await UserModel.destroy({
      where: options.where,
      transaction: this.transaction,
    });

    return {
      id: deletedId,
    };
  }
}
