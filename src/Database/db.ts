import { DataSource } from 'typeorm';
import { User } from './Enteties/User';
import { Account } from './Enteties/Account';

export const db = new DataSource({
  type: 'postgres',
  username: 'volodialishchyshyn',
  password: '1212',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  entities: [User, Account],
  synchronize: true,
  migrations: [
    './dist/src/Database/Migrations/*.js',
  ],
});
