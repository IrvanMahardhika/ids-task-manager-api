import express, { Request, Response, NextFunction } from 'express';
import UserFinderAction from '@core/actions/user/UserFinderAction';
import UserRepository from '@infras/repositories/user/UserRepository';
import JwtService from '@infras/services/jwt/JwtService';
import EncriptionService from '@infras/services/encription/EncriptionService';

const router = express.Router();

const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.query;

    const action = new UserFinderAction(
      {
        userRepo: new UserRepository(),
      },
      {
        jwtService: new JwtService(),
        encriptionService: new EncriptionService(),
      },
    );
    const { status, message, data } = await action.login({
      email: String(email),
      encriptedPassword: String(password),
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

export const getUserRouter = router.get('/login', getUserController);
