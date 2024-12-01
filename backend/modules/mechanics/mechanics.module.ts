import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { MechanicsController } from './mechanics.controller';
import { MechanicsService } from './services/mechanics.service';

@Module({
  imports: [AuthModule],
  controllers: [MechanicsController],
  providers: [MechanicsService],
})
export class MechanicsModule {}
