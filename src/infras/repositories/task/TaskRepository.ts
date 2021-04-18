import { Transaction } from 'sequelize';
import Task from '@core/entities/task/Task';
import ITaskRepository from '@core/repositories/task/ITaskRepository';
import IRepositoryOptions, {
  WhereOptions,
} from '@core/repositories/IRepositoryOptions';
import models from '@infras/database/sequelize/models';
import { repositoryOptionConverter } from '../helpers';

const { Task: TaskModel } = models;

export default class TaskRepository implements ITaskRepository {
  private transaction: Transaction;

  setTransaction(transaction: Transaction): void {
    this.transaction = transaction;
  }

  async findOne(options?: IRepositoryOptions): Promise<Task> {
    const sequelizeOptions = repositoryOptionConverter(options!);
    const task = await TaskModel.findOne({
      ...sequelizeOptions,
      transaction: this.transaction,
    });

    return task && task.get({ plain: true });
  }

  async findAll(options?: IRepositoryOptions): Promise<Task[]> {
    const sequelizeOptions = repositoryOptionConverter(options!);
    const tasks = await TaskModel.findAll({
      ...sequelizeOptions,
      transaction: this.transaction,
    });

    return tasks && tasks.map((task) => task.get({ plain: true }));
  }

  async create(entity: Task): Promise<Task> {
    const dataEntry = await TaskModel.create(entity);
    return dataEntry;
  }

  async update(entity: Task, options: WhereOptions): Promise<void> {
    await TaskModel.update(entity, {
      where: options.where,
      transaction: this.transaction,
    });
  }

  async delete(options: WhereOptions): Promise<Task> {
    const deletedId = await TaskModel.destroy({
      where: options.where,
      transaction: this.transaction,
    });

    return {
      id: deletedId,
    };
  }
}
