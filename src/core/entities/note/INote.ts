import IEntity from '../IEntity';

export default interface INote extends IEntity {
  id?: number;
  taskId?: number;
  text?: string;
}
