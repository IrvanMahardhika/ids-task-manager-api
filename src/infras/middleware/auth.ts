import { Request, Response, NextFunction } from 'express';
import IToken from '@core/types/token/IToken';
import jwt from 'jsonwebtoken';
import config from '../../config';

export const user = (req: Request, res: Response, next: NextFunction): void => {
  if (req.method !== 'OPTIONS') {
    let { authorization } = req.headers;
    console.log(`Auth User || Access attempt at ${new Date()}`);

    jwt.verify(authorization!, config.jwtKey, (error, decodedObject) => {
      const decoded = decodedObject as IToken;

      if (error) {
        console.log({ decoded }, 'Auth User || Unauthorized');
        return res.status(401).json({
          message: 'User not authorized.',
          error: 'User not authorized.',
        });
      }

      const { userId, email } = decoded;

      console.log('Auth User || Authorized');
      console.log(`User ${email}`);

      res.locals.userId = userId;

      return next();
    });
  } else {
    next();
  }
};
