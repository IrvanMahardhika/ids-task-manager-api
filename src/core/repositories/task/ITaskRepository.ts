import Task from '@core/entities/task/Task';
import IRepository from '../IRepository';

export default interface ITaskRepository extends IRepository<Task> {}
