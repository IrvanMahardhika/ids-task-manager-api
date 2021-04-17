import { Model, Sequelize, DataTypes } from 'sequelize';
import IUser from '@core/entities/user/IUser';
import IModelSet from '../IModelSet';

export class User extends Model implements IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

const init = (sequelize: Sequelize): void => {
  User.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: 'user',
    },
  );
};

const applyRelations = (models: IModelSet): void => {
  const { Task } = models;
  User.hasMany(Task, { foreignKey: 'userId' });
};

export const UserInitialization = {
  init,
  applyRelations,
};
