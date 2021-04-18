import NoteCreatorAction from '@core/actions/note/NoteCreatorAction';
import NoteRepository from '@infras/repositories/note/NoteRepository';
import RepositoryTransaction from '@infras/repositories/RepositoryTransaction';
import express, { Request, Response, NextFunction } from 'express';
import * as auth from '@infras/middleware/auth';

const router = express.Router();

const createNoteController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { taskId, text } = req.body;

    const action = new NoteCreatorAction({
      noteRepo: new NoteRepository(),
      repositoryTransaction: new RepositoryTransaction(),
    });

    const { status, message } = await action.create({ taskId, text });

    if (status === 'SUCCESS') {
      res.status(200).send({
        message,
      });
      return;
    }

    res.status(400).send({ message });
  } catch (err) {
    next(err);
  }
};

export const createNoteRouter = router.post(
  '/',
  auth.user,
  createNoteController,
);
