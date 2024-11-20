import { Module } from '@nestjs/common';

import { CarShowroomModule } from './modules/carShowroom/car-showroom.module';
import { MechanicsModule } from './modules/mechanics/mechanics.module';
import { OffersModule } from './modules/offers/offers.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule, OffersModule, CarShowroomModule, MechanicsModule],
})
export class AppModule {}
