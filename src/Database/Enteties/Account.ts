import {
  BaseEntity, Column,
  Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity('Account')
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @Column()
    balance: number;

  @Column()
    bank_account_number: number;

  @ManyToOne(
    () => User,
    (user) => user.account,
    {
      onDelete: 'CASCADE',
    },
  )

  @JoinColumn({
    name: 'user_id',
  })
    user : User;
}
