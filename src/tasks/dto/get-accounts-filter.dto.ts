/* eslint-disable prettier/prettier */
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AccountStatus } from '../account-status.enum';

export class GetAccountsFilterDto {
  @IsOptional()
  @IsEnum(AccountStatus)
  status?: AccountStatus;

  @IsOptional()
  @IsString()
  user?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
