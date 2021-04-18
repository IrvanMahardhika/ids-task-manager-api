import IEntity from '../IEntity';

export default interface INote extends IEntity {
  taskId?: number;
  text?: string;
}
