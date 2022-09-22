import { Container } from 'inversify';
import { App } from './app';
import { appBindings } from './Injection/injection';
import { TYPES } from './Injection/types';
import { AccountController } from './App/Accounts/account.controller';
import { UserController } from './App/Users/users.controller';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

async function bootstrap() : Promise<IBootstrapReturn> {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  const accountController = appContainer.get<AccountController>(TYPES.AccountController);
  const userConroller = appContainer.get<UserController>(TYPES.UserController);
  const controllers = [
    accountController.router,
    userConroller.router,
  ];

  await app.init(controllers);
  return { appContainer, app };
}

export const boot = bootstrap();
