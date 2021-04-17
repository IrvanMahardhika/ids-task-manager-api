import User from '@core/entities/user/User';
import IRepositoryTransaction from '@core/repositories/IRepositoryTransaction';
import IUserRepository from '@core/repositories/user/IUserRepository';
import IEncriptionService from '@core/services/encription/IEncriptionService';
import { instanceOfReturnValue, ReturnValue } from '@core/utils/returnValue';

interface Repositories {
  userRepo: IUserRepository;
  repositoryTransaction: IRepositoryTransaction;
}

interface Services {
  encriptionService: IEncriptionService;
}

export default class UserCreatorAction {
  private userRepo: IUserRepository;

  private repositoryTransaction: IRepositoryTransaction;

  private encriptionService: IEncriptionService;

  constructor(repo: Repositories, services: Services) {
    const { userRepo, repositoryTransaction } = repo;
    this.userRepo = userRepo;
    this.repositoryTransaction = repositoryTransaction;

    const { encriptionService } = services;
    this.encriptionService = encriptionService;
  }

  private async startTransaction() {
    if (this.repositoryTransaction) {
      await this.repositoryTransaction.startTransaction([this.userRepo]);
    }
  }

  private async commit() {
    if (this.repositoryTransaction) {
      await this.repositoryTransaction.commit();
    }
  }

  private async rollback() {
    if (this.repositoryTransaction) {
      await this.repositoryTransaction.rollback();
    }
  }

  async register(userData: User): Promise<ReturnValue<User>> {
    await this.startTransaction();

    try {
      const { name, email, password: encriptedPassword } = userData;
      const { decrypt, generateHash } = this.encriptionService;
      const decryptedPassword = decrypt(encriptedPassword!);
      const newUserData = await this.userRepo.create({
        name,
        email,
        password: generateHash(decryptedPassword),
      });
      await this.commit();
      return {
        status: 'SUCCESS',
        message: 'Success',
        data: newUserData,
      };
    } catch (error) {
      await this.rollback();
      if (instanceOfReturnValue(error)) {
        return error;
      }
      throw error;
    }
  }
}
