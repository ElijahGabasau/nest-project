import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './configs/configuration';
import { CarShowroomModule } from './modules/carShowroom/car-showroom.module';
import { MechanicsModule } from './modules/mechanics/mechanics.module';
import { OffersModule } from './modules/offers/offers.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),

    UsersModule,
    OffersModule,
    CarShowroomModule,
    MechanicsModule,
  ],
})
export class AppModule {}
