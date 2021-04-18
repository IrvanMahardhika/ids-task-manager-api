import { Model, Sequelize, DataTypes } from 'sequelize';
import ITask from '@core/entities/task/ITask';
import IModelSet from '../IModelSet';

export class Task extends Model implements ITask {
  id: number;
  userId: number;
  title: string;
  isCompleted: boolean;
}

const init = (sequelize: Sequelize): void => {
  Task.init(
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: 'task',
    },
  );
};

const applyRelations = (models: IModelSet): void => {
  const { User, Note } = models;
  Task.belongsTo(User, { foreignKey: 'userId' });
  Task.hasMany(Note, { foreignKey: 'taskId' });
};

export const TaskInitialization = {
  init,
  applyRelations,
};
