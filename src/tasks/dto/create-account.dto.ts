/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  account: string;
  
  @IsNotEmpty()
  shortAccount: string;

  @IsOptional()
  user: string;
}

