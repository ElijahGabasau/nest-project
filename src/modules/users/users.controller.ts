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

  //manager
  @Get()
  public async findAll() {
    await this.usersService.findAll();
  }

  @Get(':userId')
  public async findOne() {
    await this.usersService.findOne();
  }

  @Delete(':userId')
  public async deleteOne() {
    await this.usersService.deleteOne();
  }

  //admin
  @Patch(':userId')
  public async makeManager(@Body() updateUserDto: UpdateUserReqDto) {
    await this.usersService.makeManager();
  }

  //todo make can be one delete, just with different permissions
  // @Delete(':userId')
  // public async deleteOne() {}

  @Get(':role')
  public async findByRole() {
    await this.usersService.findByRole();
  }
}
