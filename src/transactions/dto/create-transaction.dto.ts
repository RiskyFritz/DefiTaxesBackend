/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { TransactionMethod } from '../transaction-method.enum';

export class CreateTransactionDto {
  @IsNotEmpty()
  account: string;

  @IsNotEmpty()
  transactionHash: string;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  method: TransactionMethod;
}

