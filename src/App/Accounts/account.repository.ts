import { injectable } from 'inversify';
import { DeleteResult } from 'typeorm';
import { IAccountRepository } from './Interfaces/account.repository.interface';
import { Account } from '../../Database/Enteties/Account';

@injectable()
export class AccountRepository implements IAccountRepository {
  async insertAccount(name: string, bankNumber:number, userId: string): Promise<Account> {
    const account = Account.create({
      name,
      balance: 1000,
      bank_account_number: bankNumber,
      user: {
        id: Number(userId),
      },
    });
    await account.save();
    return account;
  }

  async selectAccounts(userId: string):Promise<Account[]> {
    return Account.find({
      where: {
        user: {
          id: Number(userId),
        },
      },
    });
  }

  async deleteAccount(id: string, userId:string): Promise<DeleteResult> {
    return Account.delete(
      {
        id: Number(id),
        user: {
          id: Number(userId),
        },
      },
    );
  }

  async updateAccount(id: string, name: string, userId:string, bankNumber:number, sumOfExpense:number): Promise<Account> {
    const account = await Account.find({
      where: {
        id: Number(id),
        user: {
          id: Number(userId),
        },
      },
    });

    if (!account.length){
      throw new Error('No account');
    }
    if ((account[0].balance - sumOfExpense < 0) || sumOfExpense > account[0].balance) {
      throw new Error('You do not have enough money to make this expose');
    }

    const result = await Account.createQueryBuilder().update({
      name,
      bank_account_number: bankNumber,
      balance: account[0].balance - sumOfExpense,
    }).where(
      {
        id: Number(id),
        user: {
          id: Number(userId),
        },
      },
    ).returning('*')
      .execute();
    return result.raw[0];
  }
}
