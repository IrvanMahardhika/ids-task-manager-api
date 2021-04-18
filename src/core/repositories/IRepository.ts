import IEntity from '@core/entities/IEntity';
import IRepositoryOptions, { WhereOptions } from './IRepositoryOptions';

export default interface IRepository<Entity extends IEntity> {
  setTransaction: (transaction: any) => void;
  findOne: (options?: IRepositoryOptions) => Promise<Entity>;
  findAll: (options?: IRepositoryOptions) => Promise<Entity[]>;
  create: (entity: Entity) => Promise<Entity>;
  update: (entity: Entity, options: WhereOptions) => Promise<void>;
  delete: (options: WhereOptions) => Promise<Entity>;
}
