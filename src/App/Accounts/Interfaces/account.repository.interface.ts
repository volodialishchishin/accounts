import { DeleteResult } from 'typeorm';
import { Account } from '../../../Database/Enteties/Account';

export class IAccountRepository {
  insertAccount: (title: string, bankNumber:number, userId: string) => Promise<Account>;

  selectAccounts: (userId: string) => Promise<Account[]>;

  deleteAccount: (id: string, userId:string) => Promise<DeleteResult>;

  updateAccount: (id: string, title: string, userId:string, bunkNumber:number, sumOfExpense:number) => Promise<Account>;
}
