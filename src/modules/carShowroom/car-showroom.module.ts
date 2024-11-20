import { Module } from '@nestjs/common';

import { CarShowroomController } from './car-showroom.controller';
import { CarShowroomService } from './services/car-showroom.service';

@Module({
  controllers: [CarShowroomController],
  providers: [CarShowroomService],
})
export class CarShowroomModule {}
