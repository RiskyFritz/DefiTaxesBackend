/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountStatus } from './account-status.enum';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { GetAccountsFilterDto } from './dto/get-accounts-filter.dto';
import { UpdateAccountStatusDto } from './dto/update-account-status.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get()
  getAccounts(@Query() filterDto: GetAccountsFilterDto): Promise<Account[]> {
    return this.accountsService.getAccounts(filterDto);
  }

  @Get('/:id')
  getAccountById(@Param('id') id: string): Promise<Account> {
    return this.accountsService.getAccountById(id);
  }

  @Get('/:user')
  getAccountsByUser(@Param('user') user: string): Promise<Account[]> {
    return this.accountsService.getAccountsByUser(user);
  }

  @Post()
  createAccount(@Body() CreateAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountsService.createAccount(CreateAccountDto);
  }

  @Delete('/:id')
  deleteAccount(@Param('id') id: string): Promise<void> {
    return this.accountsService.deleteAccount(id);
  }

  @Patch('/:id/status')
  updateAccountStatus(
    @Param('id') id: string,
    @Body() updateAccountStatusDto: UpdateAccountStatusDto,
  ): Promise<Account> {
    const { status } = updateAccountStatusDto;
    return this.accountsService.updateAccountStatus(id, status);
  }
}

