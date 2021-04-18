import Task from '@core/entities/task/Task';
import ITaskRepository from '@core/repositories/task/ITaskRepository';
import { instanceOfReturnValue, ReturnValue } from '@core/utils/returnValue';

interface Repositories {
  taskRepo: ITaskRepository;
}

export default class TaskFinderAction {
  private taskRepo: ITaskRepository;

  constructor(repo: Repositories) {
    const { taskRepo } = repo;
    this.taskRepo = taskRepo;
  }

  async getTaskByUserId(conditions: {
    userId: number;
  }): Promise<ReturnValue<Task[]>> {
    try {
      const { userId } = conditions;

      const taskListPerUser = await this.taskRepo.findAll({
        where: { userId },
        include: [
          {
            model: 'Note',
            as: 'note',
            required: false,
          },
        ],
      });

      return {
        status: 'SUCCESS',
        message: 'success',
        data: taskListPerUser,
      };
    } catch (error) {
      if (instanceOfReturnValue(error)) {
        return error;
      }

      throw error;
    }
  }
}
