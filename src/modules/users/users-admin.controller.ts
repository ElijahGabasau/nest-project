import { Controller, Delete, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersAdminService } from './services/users-admin.service';

// @ApiBearerAuth()
@ApiTags('users-admin')
@Controller('users-admin')
export class UsersAdminController {
  constructor(private readonly usersAdminService: UsersAdminService) {}

  @Get('me')
  public async findMe() {
    await this.usersAdminService.findMe();
  }

  @Get()
  public async findAll() {
    await this.usersAdminService.findAll();
  }

  @Get(':userId')
  public async findOne() {
    await this.usersAdminService.findOne();
  }

  @Delete(':userId')
  public async deleteOne() {
    await this.usersAdminService.deleteOne();
  }
}
