import { Model, Sequelize, DataTypes } from 'sequelize';
import ITask from '@core/entities/task/ITask';
import IModelSet from '../IModelSet';

export class Task extends Model implements ITask {
  title?: string;
}

const init = (sequelize: Sequelize): void => {
  Task.init(
    {
      title: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: 'task',
    },
  );
};

const applyRelations = (models: IModelSet): void => {
  // apply relations here
};

export const TaskInitialization = {
  init,
  applyRelations,
};
