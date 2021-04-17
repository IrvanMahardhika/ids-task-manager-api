import IToken from '@core/types/token/IToken';
import IJwtService from '@core/services/jwt/IJwtService';
import jwt from 'jsonwebtoken';
import config from '../../../config';

export default class JwtService implements IJwtService {
  createJWTToken(payload: IToken): string {
    return jwt.sign(payload, config.jwtKey, { expiresIn: '7d' });
  }
}
