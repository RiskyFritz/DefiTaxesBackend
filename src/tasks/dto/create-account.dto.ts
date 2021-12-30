/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  account: string;
  
  @IsNotEmpty()
  shortAccount: string;
}

