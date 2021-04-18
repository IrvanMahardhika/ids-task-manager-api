import UserCreatorAction from '@core/actions/user/UserCreatorAction';
import UserRepository from '@infras/repositories/user/UserRepository';
import RepositoryTransaction from '@infras/repositories/RepositoryTransaction';
import EncriptionService from '@infras/services/encription/EncriptionService';
import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { checkValidationResult } from '@infras/middleware/validator';

const router = express.Router();

const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const action = new UserCreatorAction(
      {
        userRepo: new UserRepository(),
        repositoryTransaction: new RepositoryTransaction(),
      },
      {
        encriptionService: new EncriptionService(),
      },
    );

    const { status, message } = await action.register({
      name,
      email,
      password,
    });

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

export const registerUserRouter = router.post(
  '/register',
  body('email').isEmail(),
  checkValidationResult,
  registerUserController,
);
