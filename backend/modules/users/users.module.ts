import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { AuthCacheService } from '../auth/services/auth-cache-service';
import { UsersService } from './services/users.service';
import { UsersAdminService } from './services/users-admin.service';
import { UsersSuperAdminService } from './services/users-super-admin.service';
import { UsersController } from './users.controller';
import { UsersAdminController } from './users-admin.controller';
import { UsersSuperAdminController } from './users-super-admin.controller';

@Module({
  imports: [AuthModule],
  controllers: [
    UsersController,
    UsersAdminController,
    UsersSuperAdminController,
  ],
  providers: [UsersService, UsersAdminService, UsersSuperAdminService],
})
export class UsersModule {}
