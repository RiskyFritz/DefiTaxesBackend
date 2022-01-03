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
import { TransactionsService } from './transactions.service';
import { TransactionMethod } from './transaction-method.enum';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionsFilterDto } from './dto/get-transactions-filter.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  getTransactions(@Query() filterDto: GetTransactionsFilterDto): Promise<Transaction[]> {
    return this.transactionsService.getTransactions(filterDto);
  }

  @Get('/:id')
  getTransactionById(@Param('id') id: string): Promise<Transaction> {
    return this.transactionsService.getTransactionById(id);
  }

  @Get('/:account')
  getTransactionsByAccount(@Param('account') account: string): Promise<Transaction[]> {
    return this.transactionsService.getTransactionsByAccount(account);
  }

  @Post()
  createTransaction(@Body() CreateTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionsService.createTransaction(CreateTransactionDto);
  }

  @Delete('/:id')
  deleteTransaction(@Param('id') id: string): Promise<void> {
    return this.transactionsService.deleteTransaction(id);
  }
}

