import { Transaction } from 'sequelize';
import Note from '@core/entities/note/Note';
import INoteRepository from '@core/repositories/note/INoteRepository';
import IRepositoryOptions, {
  WhereOptions,
} from '@core/repositories/IRepositoryOptions';
import models from '@infras/database/sequelize/models';
import { repositoryOptionConverter } from '../helpers';

const { Note: NoteModel } = models;

export default class NoteRepository implements INoteRepository {
  private transaction: Transaction;

  setTransaction(transaction: Transaction): void {
    this.transaction = transaction;
  }

  async findOne(options?: IRepositoryOptions): Promise<Note> {
    const sequelizeOptions = repositoryOptionConverter(options!);
    const note = await NoteModel.findOne({
      ...sequelizeOptions,
      transaction: this.transaction,
    });

    return note && note.get({ plain: true });
  }

  async findAll(options?: IRepositoryOptions): Promise<Note[]> {
    const sequelizeOptions = repositoryOptionConverter(options!);
    const notes = await NoteModel.findAll({
      ...sequelizeOptions,
      transaction: this.transaction,
    });

    return notes && notes.map((note) => note.get({ plain: true }));
  }

  async create(entity: Note): Promise<Note> {
    const dataEntry = await NoteModel.create(entity);
    return dataEntry;
  }

  async update(entity: Note, options: WhereOptions): Promise<void> {
    await NoteModel.update(entity, {
      where: options.where,
      transaction: this.transaction,
    });
  }

  async delete(options: WhereOptions): Promise<Note> {
    const deletedId = await NoteModel.destroy({
      where: options.where,
      transaction: this.transaction,
    });

    return {
      id: deletedId,
    };
  }
}
