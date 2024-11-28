import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { RedisModule } from '../redis/redis.module';
import { OffersController } from './offers.controller';
import { CurrencyService } from './services/currency.service';
import { OffersService } from './services/offers.service';

@Module({
  imports: [RedisModule, MailModule, AuthModule],
  controllers: [OffersController],
  providers: [OffersService, CurrencyService],
  exports: [CurrencyService],
})
export class OffersModule {}
