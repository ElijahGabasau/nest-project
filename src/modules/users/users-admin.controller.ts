import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserID } from '../../common/types/entity-ids.type';
import { UserBaseResDto } from './models/dto/res/user-base.res.dto';
import { UserMapper } from './services/user.mapper';
import { UsersAdminService } from './services/users-admin.service';

@ApiBearerAuth()
@ApiTags('users-admin')
@Controller('users-admin')
export class UsersAdminController {
  constructor(private readonly usersAdminService: UsersAdminService) {}

  //todo not sure if this is needed
  // @Get()
  // public async findAll() {
  //   await this.usersAdminService.findAll();
  // }

  @Get(':userId')
  public async findOne(
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<UserBaseResDto> {
    const result = await this.usersAdminService.findOne(userId);
    return UserMapper.toResDto(result);
  }

  @Patch('ban:userId')
  public async ban(
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<void> {
    await this.usersAdminService.ban(userId);
  }
}
