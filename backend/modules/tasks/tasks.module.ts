import { Module } from '@nestjs/common';

import { CurrencyService } from '../offers/services/currency.service';
import { RedisModule } from '../redis/redis.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [RedisModule],
  providers: [TasksService, CurrencyService],
})
export class TasksModule {}
