import ITask from './ITask';

export default class Task implements ITask {
  id?: number;
  userId?: number;
  title?: string;
  isCompleted?: boolean;
}
