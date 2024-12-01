import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { StatisticService } from './services/statistic.service';
import { StatisticController } from './statistic.controller';

@Module({
  imports: [AuthModule],
  controllers: [StatisticController],
  providers: [StatisticService],
})
export class StatisticModule {}
