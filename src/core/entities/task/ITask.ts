import IEntity from '../IEntity';

export default interface ITask extends IEntity {
  userId?: number;
  title?: string;
}
