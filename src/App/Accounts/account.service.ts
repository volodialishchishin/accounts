import { inject, injectable } from 'inversify';
import { DeleteResult } from 'typeorm';
import { TYPES } from '../../Injection/types';
import { IAccountRepository } from './Interfaces/account.repository.interface';
import { IAccountService } from './Interfaces/account.service.interface';
import { Account } from '../../Database/Enteties/Account';

@injectable()
export class AccountService implements IAccountService {
  constructor(@inject(TYPES.AccountRepository) private accountRepository: IAccountRepository) {}

  async getAccounts(userId:string): Promise<Account[]> {
    const accounts = await this.accountRepository.selectAccounts(userId);
    if (!accounts) {
      throw new Error();
    }
    return accounts;
  }

  async createAccount(name: string, bankNumber:number, userId: string): Promise<Account> {
    if (!name) {
      throw new Error();
    }
    const account = await this.accountRepository.insertAccount(name, bankNumber, userId);
    if (!account) {
      throw new Error();
    } else {
      return account;
    }
  }

  async deleteAccount(id: string, userId:string): Promise<DeleteResult> {
    const account = await this.accountRepository.deleteAccount(id, userId);
    return account;
  }

  async updateAccount(id: string, name: string, bankNumber:number, sumOfExpense:number, userId: string): Promise<Account> {
    if (!name) {
      throw new Error('No name');
    }
    const account = await this.accountRepository.updateAccount(id, name, userId, bankNumber, sumOfExpense);
    return account;
  }
}
