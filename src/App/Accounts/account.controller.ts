import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../../Common/base.controller';
import { TYPES } from '../../Injection/types';
import { HTTPError } from '../../Errors/http-error.class';
import { IAccountController } from './Interfaces/account.controller.interface';
import { IAccountService } from './Interfaces/account.service.interface';

@injectable()
export class AccountController extends BaseController implements IAccountController {
  constructor(
    @inject(TYPES.AccountService) private accountService: IAccountService,
  ) {
    super();
    this.bindRoutes([
      { path: '/accounts', method: 'get', func: this.getAccounts },
      { path: '/accounts', method: 'post', func: this.createAccount },
      { path: '/accounts/:id', method: 'delete', func: this.deleteAccount },
      { path: '/accounts/:id', method: 'put', func: this.updateAccount },
    ]);
  }

  async getAccounts(req: Request, res: Response, next:NextFunction): Promise<any> {
    const { context: { userId } } = req;
    try {
      const accounts = await this.accountService.getAccounts(userId);
      res.status(200).json(accounts);
    } catch (e) {
      next(HTTPError.NoAccounts());
    }
  }

  async createAccount(req: Request, res: Response, next:NextFunction): Promise<any> {
    const { name, accountNumber } = req.body;
    const { context: { userId } } = req;
    try {
      const newAccount = await this.accountService.createAccount(name, accountNumber, userId);
      res.status(201).json(newAccount);
    } catch (e) {
      next(HTTPError.NoName());
    }
  }

  async deleteAccount(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { context: { userId } } = req;
    const deletedAccount = await this.accountService.deleteAccount(id, userId);
    res.status(200).json(deletedAccount);
  }

  async updateAccount(req: Request, res: Response, next:NextFunction): Promise<void> {
    const { id } = req.params;
    const { name, accountNumber, balance } = req.body;
    const { context: { userId } } = req;
    try {
      const updatedAccount = await this.accountService.updateAccount(id, name, accountNumber, balance, userId);
      res.status(200).json(updatedAccount);
    } catch (e:Error | any) {
      next(new HTTPError(421, e.message));
    }
  }
}
