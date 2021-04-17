import express, { Request, Response, NextFunction } from 'express';
import TaskFinderAction from '@core/actions/task/TaskFinderAction';
import TaskRepository from '@infras/repositories/task/TaskRepository';
import * as auth from '@infras/middleware/auth';

const router = express.Router();

const getTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = res.locals;

    const action = new TaskFinderAction({
      taskRepo: new TaskRepository(),
    });
    const { status, message, data } = await action.getTaskByUserId({
      userId: Number(userId),
    });

    if (status === 'SUCCESS') {
      res.status(200).send({
        message,
        data,
      });
      return;
    }

    res.status(400).send({ message });
  } catch (error) {
    next(error);
  }
};

export const getTaskRouter = router.get('/', auth.user, getTaskController);
