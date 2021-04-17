import User from '@core/entities/user/User';
import IUserRepository from '@core/repositories/user/IUserRepository';
import IJwtService from '@core/services/jwt/IJwtService';
import IEncriptionService from '@core/services/encription/IEncriptionService';
import { instanceOfReturnValue, ReturnValue } from '@core/utils/returnValue';

interface Repositories {
  userRepo: IUserRepository;
}

interface Services {
  jwtService: IJwtService;
  encriptionService: IEncriptionService;
}

export default class TaskCreatorAction {
  private userRepo: IUserRepository;

  private jwtService: IJwtService;

  private encriptionService: IEncriptionService;

  constructor(repo: Repositories, services: Services) {
    const { userRepo } = repo;
    this.userRepo = userRepo;

    const { jwtService, encriptionService } = services;
    this.jwtService = jwtService;
    this.encriptionService = encriptionService;
  }

  async login(conditions: {
    email: string;
    encriptedPassword: string;
  }): Promise<ReturnValue<any>> {
    try {
      const { email, encriptedPassword } = conditions;
      const { decrypt, compareHash } = this.encriptionService;
      const decryptedPassword = decrypt(encriptedPassword);

      const user = await this.userRepo.findOne({
        where: { email },
      });

      if (!user) {
        return {
          status: 'INVALID',
          message: 'Email / Password is incorrect',
        };
      }

      if (!compareHash(decryptedPassword, user.password!)) {
        return {
          status: 'INVALID',
          message: 'Email / Password is incorrect',
        };
      }

      const token = this.jwtService.createJWTToken({
        userId: user.id!,
        email: user.email!,
      });

      const data = {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      };

      return {
        status: 'SUCCESS',
        message: 'success',
        data,
      };
    } catch (error) {
      if (instanceOfReturnValue(error)) {
        return error;
      }

      throw error;
    }
  }
}
