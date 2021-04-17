import IToken from '@core/types/token/IToken';

export default interface IJwtService {
  createJWTToken: (payload: IToken) => string;
}
