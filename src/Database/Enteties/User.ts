import {
  BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './Account';

@Entity('User')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id:number;

  @Column({
    unique: true,
  })
    name:string;

  @Column()
    password:string;

  @OneToMany(
    () => Account,
    (account) => account.user,
  )
    account:Account[];
}
