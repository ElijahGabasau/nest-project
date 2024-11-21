import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { UpdateUserAccountReqDto } from './models/dto/req/update-user-account.req.dto';
import { UserBaseReqDto } from './models/dto/req/user-base.req.dto';
import { UsersService } from './services/users.service';

// @ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //user
  @Get('me')
  public async findMe() {
    await this.usersService.findMe();
  }

  @Patch('me')
  public async updateMe(@Body() updateUserDto: UpdateUserReqDto) {
    await this.usersService.updateMe();
  }

  @Delete('me')
  public async deleteMe() {
    await this.usersService.deleteMe();
  }

  @Patch('account')
  public async updateAccount(@Body() updateUserDto: UpdateUserAccountReqDto) {
    await this.usersService.updateAccount();
  }
}
