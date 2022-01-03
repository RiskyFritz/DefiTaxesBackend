/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionMethod } from './transaction-method.enum';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionsFilterDto } from './dto/get-transactions-filter.dto';
import { TransactionsRepository } from './transactions.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsRepository)
    private TransactionsRepository: TransactionsRepository,
  ) {}

  getTransactions(filterDto: GetTransactionsFilterDto): Promise<Transaction[]> {
    return this.TransactionsRepository.getTransactions(filterDto);
  }

  async getTransactionById(id: string): Promise<Transaction> {
    const found = await this.TransactionsRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Transaction with ID "${id}" not found`);
    }

    return found;
  }

  getTransactionsByAccount(account: string): Promise<Transaction[]> {
    return this.TransactionsRepository.getTransactionsByAccount(account);
  }

  createTransaction(CreateTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.TransactionsRepository.createTransaction(CreateTransactionDto);
  }

  async deleteTransaction(id: string): Promise<void> {
    const result = await this.TransactionsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Transaction with ID "${id}" not found`);
    }
  }
}
