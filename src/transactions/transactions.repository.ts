/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from "typeorm";
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from "./transaction.entity";
import { GetTransactionsFilterDto } from "./dto/get-transactions-filter.dto";
import convertToOneAddress from "src/utilities/convertAddress";
import { BadRequestException } from "@nestjs/common";

@EntityRepository(Transaction)
export class TransactionsRepository extends Repository<Transaction> {
    async getTransactions(filterDto: GetTransactionsFilterDto): Promise<Transaction[]> {
        const { method, account, transactionHash, dateFrom, dateTo, search } = filterDto;

        const query = this.createQueryBuilder('Transaction');

        if (method) {
            query.andWhere('Transaction.method = :method',  { method });
        }

        if (account)  {
            query.andWhere('Transaction.account = :account', { account });
        }

        if (transactionHash)  {
            query.andWhere('Transaction.transactionHash = :transactionHash', { transactionHash });
        }

        if (dateFrom && dateTo) {
            query.andWhere('Transaction.date BETWEEN :dateFrom AND :dateTo', { dateFrom, dateTo });
        }

        if (search) {
            query.andWhere(
                'LOWER(Transaction.title) LIKE LOWER(:search) OR LOWER(Transaction.description) LIKE LOWER(:search)',
                { search: `%${search}%`},
            );
        }
        const Transactions = await query.getMany();
        return Transactions;
    }
    
    async getTransactionsByAccount(account: string): Promise<Transaction[]> {
        const query = this.createQueryBuilder('Transaction');
        query.andWhere('Transaction.account = :account', { account });
        const Transactions = await query.getMany();
        return Transactions;
    }

    async createTransaction(createTransactionDto: CreateTransactionDto, gasUnitsValue?: number, gasFeeUsdValue?: number, TransactionValue?: number): Promise<Transaction> {
        const { account, transactionHash, method, date} = createTransactionDto;
        const bechAccount = convertToOneAddress(account);
        // set the gasUnits and gasFeeUsd to 0 if they are not provided
        const gasUnits = gasUnitsValue ? gasUnitsValue : 0;
        const gasFeeUsd = gasFeeUsdValue ? gasFeeUsdValue : 0;
        const value = TransactionValue ? TransactionValue : 0;

        // if the user and transaction are not unique, throw an error
        const existingTransaction = await this.findOne({
            where: { transactionHash, account },
        });
        // if existingTransaction is not null, show a message 
        if (existingTransaction) {
            throw new BadRequestException(`Account with transaction ${transactionHash} already exists`);
        } else {

        const Transaction = this.create({
        account,
        bechAccount,
        transactionHash,
        method,
        gasUnits,
        gasFeeUsd,
        value,
        date,
        });

        await this.save(Transaction);
        return Transaction;
    }
    }
}