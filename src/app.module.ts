import { Module } from '@nestjs/common';
import { AccountsModule } from './tasks/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AccountsModule,
    TransactionsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'defi-taxes',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
