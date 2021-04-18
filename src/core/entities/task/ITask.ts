import IEntity from '../IEntity';

export default interface ITask extends IEntity {
  id?: number;
  userId?: number;
  title?: string;
  isCompleted?: boolean;
}
