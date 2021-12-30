/* eslint-disable prettier/prettier */
import { IsEnum } from "class-validator";
import { AccountStatus } from '../account-status.enum';

export class UpdateAccountStatusDto {
    @IsEnum(AccountStatus)
    status: AccountStatus;
}