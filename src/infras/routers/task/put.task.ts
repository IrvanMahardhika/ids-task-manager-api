import TaskUpdaterAction from '@core/actions/task/TaskUpdaterAction';
import TaskRepository from '@infras/repositories/task/TaskRepository';
import RepositoryTransaction from '@infras/repositories/RepositoryTransaction';
import express, { Request, Response, NextFunction } from 'express';
import * as auth from '@infras/middleware/auth';

const router = express.Router();

const setCompletedTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { taskId } = req.params;

    const action = new TaskUpdaterAction({
      taskRepo: new TaskRepository(),
      repositoryTransaction: new RepositoryTransaction(),
    });

    const { status, message } = await action.setCompleted(Number(taskId));

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

export const setCompletedTaskRouter = router.put(
  '/completed/:taskId',
  auth.user,
  setCompletedTaskController,
);
