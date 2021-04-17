import Task from '@core/entities/task/Task';
import IRepositoryTransaction from '@core/repositories/IRepositoryTransaction';
import ITaskRepository from '@core/repositories/task/ITaskRepository';
import { instanceOfReturnValue, ReturnValue } from '@core/utils/returnValue';

interface Repositories {
  taskRepo: ITaskRepository;
  repositoryTransaction: IRepositoryTransaction;
}

export default class TaskCreatorAction {
  private taskRepo: ITaskRepository;

  private repositoryTransaction: IRepositoryTransaction;

  constructor(repo: Repositories) {
    const { taskRepo, repositoryTransaction } = repo;
    this.taskRepo = taskRepo;
    this.repositoryTransaction = repositoryTransaction;
  }

  private async startTransaction() {
    if (this.repositoryTransaction) {
      await this.repositoryTransaction.startTransaction([this.taskRepo]);
    }
  }

  private async commit() {
    if (this.repositoryTransaction) {
      await this.repositoryTransaction.commit();
    }
  }

  private async rollback() {
    if (this.repositoryTransaction) {
      await this.repositoryTransaction.rollback();
    }
  }

  async create(taskData: Task): Promise<ReturnValue<Task>> {
    await this.startTransaction();

    try {
      const newTaskData = await this.taskRepo.create(taskData);
      await this.commit();
      return {
        status: 'SUCCESS',
        message: 'Success',
        data: newTaskData,
      };
    } catch (error) {
      await this.rollback();
      if (instanceOfReturnValue(error)) {
        return error;
      }
      throw error;
    }
  }
}
