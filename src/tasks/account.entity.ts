/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AccountStatus } from './account-status.enum';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  account: string;
  @Column()
  shortAccount: string;
  @Column()
  bechAccount: string;
  @Column()
  status: AccountStatus;
}
