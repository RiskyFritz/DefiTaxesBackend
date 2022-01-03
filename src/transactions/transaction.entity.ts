/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionMethod } from './transaction-method.enum';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  account: string;
  @Column()
  bechAccount: string;
  @Column()
  transactionHash: string;
  @Column()
  date: Date;
  @Column()
  method: TransactionMethod;
  @Column()
  gasUnits: number;
  @Column()
  gasFeeUsd: number;
  @Column()
  value: number;
}
