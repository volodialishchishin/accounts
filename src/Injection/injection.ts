import { ContainerModule, interfaces } from 'inversify';
import { App } from '../app';
import { TYPES } from './types';
import { AccountController } from '../App/Accounts/account.controller';
import { AccountService } from '../App/Accounts/account.service';
import { AccountRepository } from '../App/Accounts/account.repository';
import { UserController } from '../App/Users/users.controller';
import { UserService } from '../App/Users/users.service';
import { IConfigService } from '../Config/config.service.interface';
import { ConfigService } from '../Config/config.service';
import { UsersRepository } from '../App/Users/users.repository';
import { IUserService } from '../App/Users/Interfaces/users.service.interface';
import { ErrorMiddleware } from '../Middlewares/errorMiddleware';
import { IExeptionFilter } from '../Middlewares/errorMiddleware.interface';
import { IUserController } from '../App/Users/Interfaces/users.controller.interface';
import { IUserRepository } from '../App/Users/Interfaces/users.repository.interface';
import { IAccountService } from '../App/Accounts/Interfaces/account.service.interface';
import { IAccountRepository } from '../App/Accounts/Interfaces/account.repository.interface';
import { IAccountController } from '../App/Accounts/Interfaces/account.controller.interface';
import { LoggerService } from '../Common/logger/logger.service';
import { ILogger } from '../Common/logger/logger.interface';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.Application).to(App);
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();

  bind<IAccountController>(TYPES.AccountController).to(AccountController);
  bind<IAccountService>(TYPES.AccountService).to(AccountService);
  bind<IAccountRepository>(TYPES.AccountRepository).to(AccountRepository);

  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<IUserRepository>(TYPES.UsersRepository).to(UsersRepository);

  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<IExeptionFilter>(TYPES.ExceptionFilter).to(ErrorMiddleware);
});
export {
  appBindings,
};
