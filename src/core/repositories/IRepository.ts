import IEntity from '@core/entities/IEntity';
import IRepositoryOptions, { WhereOptions } from './IRepositoryOptions';

export default interface IRepository<Entity extends IEntity> {
  findOne: (options?: IRepositoryOptions) => Promise<Entity>;
  findAll: (options?: IRepositoryOptions) => Promise<Entity[]>;
  create: (entity: Entity) => Promise<Entity>;
  delete: (options: WhereOptions) => Promise<Entity>;
}
