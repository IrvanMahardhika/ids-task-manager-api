import Note from '@core/entities/note/Note';
import IRepositoryTransaction from '@core/repositories/IRepositoryTransaction';
import INoteRepository from '@core/repositories/note/INoteRepository';
import { instanceOfReturnValue, ReturnValue } from '@core/utils/returnValue';

interface Repositories {
  noteRepo: INoteRepository;
  repositoryTransaction: IRepositoryTransaction;
}

export default class TaskCreatorAction {
  private noteRepo: INoteRepository;

  private repositoryTransaction: IRepositoryTransaction;

  constructor(repo: Repositories) {
    const { noteRepo, repositoryTransaction } = repo;
    this.noteRepo = noteRepo;
    this.repositoryTransaction = repositoryTransaction;
  }

  private async startTransaction() {
    if (this.repositoryTransaction) {
      await this.repositoryTransaction.startTransaction([this.noteRepo]);
    }
  }

  private async commit() {
    if (this.repositoryTransaction) {
      await this.repositoryTransaction.commit();
    }
  }

  private async rollback() {
    if (this.repositoryTransaction) {
      await this.repositoryTransaction.rollback();
    }
  }

  async create(noteData: Note): Promise<ReturnValue<Note>> {
    await this.startTransaction();

    try {
      const newNoteData = await this.noteRepo.create(noteData);
      await this.commit();
      return {
        status: 'SUCCESS',
        message: 'Success',
        data: newNoteData,
      };
    } catch (error) {
      await this.rollback();
      if (instanceOfReturnValue(error)) {
        return error;
      }
      throw error;
    }
  }
}
