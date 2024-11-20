import { Module } from '@nestjs/common';

import { OffersController } from './offers.controller';
import { OffersService } from './services/offers.service';

@Module({
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
