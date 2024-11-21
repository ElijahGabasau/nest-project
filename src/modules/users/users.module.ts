import { Module } from '@nestjs/common';

import { UsersService } from './services/users.service';
import { UsersAdminService } from './services/users-admin.service';
import { UsersSuperAdminService } from './services/users-super-admin.service';
import { UsersController } from './users.controller';
import { UsersAdminController } from './users-admin.controller';
import { UsersSuperAdminController } from './users-super-admin.controller';

@Module({
  controllers: [
    UsersController,
    UsersAdminController,
    UsersSuperAdminController,
  ],
  providers: [UsersService, UsersAdminService, UsersSuperAdminService],
})
export class UsersModule {}
