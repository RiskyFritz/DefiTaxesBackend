/* eslint-disable prettier/prettier */
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { TransactionMethod } from '../transaction-method.enum';

export class GetTransactionsFilterDto {
  @IsOptional()
  @IsEnum(TransactionMethod)
  method?: TransactionMethod;

  @IsOptional()
  @IsString()
  account?: string;

  @IsOptional()
  @IsString()
  transactionHash?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsDate()
  dateFrom?: Date;
  dateTo?: Date;
}
