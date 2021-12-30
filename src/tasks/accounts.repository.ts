/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from "typeorm";
import { AccountStatus } from "./Account-status.enum";
import { CreateAccountDto } from './dto/create-Account.dto';
import { Account } from "./Account.entity";
import { GetAccountsFilterDto } from "./dto/get-Accounts-filter.dto";

@EntityRepository(Account)
export class AccountsRepository extends Repository<Account> {
    async getAccounts(filterDto: GetAccountsFilterDto): Promise<Account[]> {
        const { status, search } = filterDto;

        const query = this.createQueryBuilder('Account');

        if (status) {
            query.andWhere('Account.status = :status',  { status });
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
    async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
        const { account, shortAccount } = createAccountDto;

        const Account = this.create({
        account,
        shortAccount,
        status: AccountStatus.VERIFIED,
        });

        await this.save(Account);
        return Account;
    }
}