import { DeleteResult } from 'typeorm';
import { Account } from '../../../Database/Enteties/Account';

export interface IAccountService {
  getAccounts: (userId: string) => Promise<Account[]>;

  createAccount: (name: string, bankNumber:number, userId: string) => Promise<Account>;

  deleteAccount: (id: string, userId:string) => Promise<DeleteResult>;

  updateAccount: (id: string, name: string, bankNumber:number, balance:number, userId: string) => Promise<Account>;

}
