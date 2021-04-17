import TaskCreatorAction from '@core/actions/task/TaskCreatorAction';
import TaskRepository from '@infras/repositories/task/TaskRepository';
import RepositoryTransaction from '@infras/repositories/RepositoryTransaction';
import express, { Request, Response, NextFunction } from 'express';
import * as auth from '@infras/middleware/auth';

const router = express.Router();

const createTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { title } = req.body;
    const { userId } = res.locals;

    const action = new TaskCreatorAction({
      taskRepo: new TaskRepository(),
      repositoryTransaction: new RepositoryTransaction(),
    });

    const { status, message } = await action.create({ userId, title });

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

export const postTaskRouter = router.post('/', auth.user, createTaskController);
