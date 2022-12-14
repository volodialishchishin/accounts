import { inject, injectable } from 'inversify';
import bcrypt from 'bcrypt';
import { IConfigService } from '../../Config/config.service.interface';
import { UsersRepository } from './users.repository';
import { IUserService } from './Interfaces/users.service.interface';
import { TYPES } from '../../Injection/types';
import { User } from '../../Database/Enteties/User';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UsersRepository) private usersRepository: UsersRepository,
  ) {
  }

  async createUser(name: string, password: string): Promise<User | null> {
    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const salt = this.configService.get('SALT');

    if (passwordValidation.test(password)) {
      const hashPassword = await bcrypt.hash(password, Number(salt));
      const existedUser = await this.usersRepository.find(name);
      if (existedUser) {
        throw new Error('User exist');
      }
      const user = await this.usersRepository.create(name, hashPassword);

      return user;
    }

    throw new Error('Password do not match following requirements');
  }

  async login(name: string, password: string): Promise<User> {
    const existedUser = await this.usersRepository.find(name);

    if (!existedUser) {
      throw new Error('Incorrect login or password');
    }

    if (!bcrypt.compareSync(password, existedUser.password)) {
      throw new Error('Incorrect login or password');
    }

    return existedUser;
  }
}
