/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from "typeorm";
import { AccountStatus } from "./Account-status.enum";
import { CreateAccountDto } from './dto/create-Account.dto';
import { Account } from "./Account.entity";
import { GetAccountsFilterDto } from "./dto/get-Accounts-filter.dto";
import convertToOneAddress from "src/utilities/convertAddress";
import { BadRequestException } from "@nestjs/common";

@EntityRepository(Account)
export class AccountsRepository extends Repository<Account> {
    async getAccounts(filterDto: GetAccountsFilterDto): Promise<Account[]> {
        const { status, user, search } = filterDto;

        const query = this.createQueryBuilder('Account');

        if (status) {
            query.andWhere('Account.status = :status',  { status });
        }

        if (user)  {
            query.andWhere('Account.user = :user', { user });
        }

        if (search) {
            query.andWhere(
                'LOWER(Account.title) LIKE LOWER(:search) OR LOWER(Account.description) LIKE LOWER(:search)',
                { search: `%${search}%`},
            );
        }
        const Accounts = await query.getMany();
        return Accounts;
    }
    
    async getAccountsByUser(user: string): Promise<Account[]> {
        const query = this.createQueryBuilder('Account');
        query.andWhere('Account.user = :user', { user });
        const Accounts = await query.getMany();
        return Accounts;
    }

    async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
        const { account, shortAccount, user } = createAccountDto;
        const bechAccount = convertToOneAddress(account);

        // if the user and account are not unique, throw an error
        const existingAccount = await this.findOne({
            where: { account, user },
        });
        // if existingAccount is not null, show a message 
        if (existingAccount) {
            throw new BadRequestException(`Account with account ${account} already exists`);
        } else {

        const Account = this.create({
        account,
        shortAccount,
        bechAccount,
        status: AccountStatus.VERIFIED,
        user,
        });

        await this.save(Account);
        return Account;
    }
    }
}