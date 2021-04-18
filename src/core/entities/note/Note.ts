import INote from './INote';

export default class Task implements INote {
  id?: number;
  taskId?: number;
  text?: string;
}
