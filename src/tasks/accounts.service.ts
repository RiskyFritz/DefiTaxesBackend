import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountStatus } from './Account-status.enum';
import { CreateAccountDto } from './dto/create-Account.dto';
import { GetAccountsFilterDto } from './dto/get-Accounts-filter.dto';
import { AccountsRepository } from './Accounts.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './Account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountsRepository)
    private AccountsRepository: AccountsRepository,
  ) {}

  getAccounts(filterDto: GetAccountsFilterDto): Promise<Account[]> {
    return this.AccountsRepository.getAccounts(filterDto);
  }

  //   getAllAccounts(): Account[] {
  //     return this.Accounts;
  //   }

  //   getAccountsWithFilters(filterDto: GetAccountsFilterDto): Account[] {
  //     const { status, search } = filterDto;
  //     let Accounts = this.getAllAccounts();

  //     if (status) {
  //       Accounts = Accounts.filter((Account) => Account.status === status);
  //     }

  //     if (search) {
  //       Accounts = Accounts.filter((Account) => {
  //         if (Account.title.includes(search) || Account.description.includes(search)) {
  //           return true;
  //         }
  //         return false;
  //       });
  //     }

  //     return Accounts;
  //   }

  async getAccountById(id: string): Promise<Account> {
    const found = await this.AccountsRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Account with ID "${id}" not found`);
    }

    return found;
  }

  createAccount(CreateAccountDto: CreateAccountDto): Promise<Account> {
    return this.AccountsRepository.createAccount(CreateAccountDto);
  }

  //     this.Accounts.push(Account);
  //     return Account;
  //   }

  async deleteAccount(id: string): Promise<void> {
    const result = await this.AccountsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Account with ID "${id}" not found`);
    }
  }

  async updateAccountStatus(
    id: string,
    status: AccountStatus,
  ): Promise<Account> {
    const Account = await this.getAccountById(id);

    Account.status = status;
    await this.AccountsRepository.save(Account);

    return Account;
  }
}
