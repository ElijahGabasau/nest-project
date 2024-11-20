import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserBaseReqDto } from './models/dto/req/user-base.req.dto';
import { UsersService } from './services/users.service';

// @ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: UserBaseReqDto) {
    return await this.usersService.create();
  }
}
