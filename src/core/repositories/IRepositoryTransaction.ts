import IEntity from '@core/entities/IEntity';
import IRepository from './IRepository';

export default interface IRepositoryTransaction {
  startTransaction: (repositories: IRepository<IEntity>[]) => Promise<any>;
  commit: () => Promise<void>;
  rollback: () => Promise<void>;
}
