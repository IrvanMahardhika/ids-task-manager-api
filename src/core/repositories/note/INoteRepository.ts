import Note from '@core/entities/note/Note';
import IRepository from '../IRepository';

export default interface INoteRepository extends IRepository<Note> {}
