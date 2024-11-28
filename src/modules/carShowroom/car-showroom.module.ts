import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CarShowroomController } from './car-showroom.controller';
import { CarShowroomService } from './services/car-showroom.service';

@Module({
  imports: [AuthModule],
  controllers: [CarShowroomController],
  providers: [CarShowroomService],
})
export class CarShowroomModule {}
