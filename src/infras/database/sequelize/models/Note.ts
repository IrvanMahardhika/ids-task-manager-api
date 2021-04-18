import { Model, Sequelize, DataTypes } from 'sequelize';
import INote from '@core/entities/note/INote';
import IModelSet from '../IModelSet';

export class Note extends Model implements INote {
  id: number;
  taskId: number;
  text: string;
}

const init = (sequelize: Sequelize): void => {
  Note.init(
    {
      taskId: {
        type: DataTypes.INTEGER,
      },
      text: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      tableName: 'note',
    },
  );
};

const applyRelations = (models: IModelSet): void => {
  const { Task } = models;
  Note.belongsTo(Task, { foreignKey: 'taskId' });
};

export const NoteInitialization = {
  init,
  applyRelations,
};
