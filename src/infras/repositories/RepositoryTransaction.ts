import { Transaction } from 'sequelize';
import DB from '@infras/database/sequelize';
import IRepositoryTransaction from '@core/repositories/IRepositoryTransaction';
import IRepository from '@core/repositories/IRepository';
import IEntity from '@core/entities/IEntity';

export default class RepositoryTransaction implements IRepositoryTransaction {
  public transaction: Transaction;

  async startTransaction(
    repositories: IRepository<IEntity>[],
  ): Promise<Transaction> {
    const sequelize = DB.getSequelizeInstance();
    this.transaction = await sequelize.transaction();

    repositories.forEach((repo) => {
      if (repo) {
        repo.setTransaction(this.transaction);
      }
    });

    return this.transaction;
  }

  async commit(): Promise<void> {
    await this.transaction.commit();
  }

  async rollback(): Promise<void> {
    await this.transaction.rollback();
  }
}
