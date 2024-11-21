import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersSuperAdminService } from './services/users-super-admin.service';

// @ApiBearerAuth()
@ApiTags('users-super-admin')
@Controller('users-super-admin')
export class UsersSuperAdminController {
  constructor(
    private readonly usersSuperAdminService: UsersSuperAdminService,
  ) {}

  @Get('me')
  public async findMe() {
    await this.usersSuperAdminService.findMe();
  }

  @Post()
  public async makeManager() {
    await this.usersSuperAdminService.makeManager();
  }

  @Delete(':userId')
  public async deleteOne() {
    await this.usersSuperAdminService.deleteOne();
  }

  @Get(':role')
  public async findByRole() {
    await this.usersSuperAdminService.findByRole();
  }
}
