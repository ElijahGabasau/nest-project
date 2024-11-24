import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { UserBaseResDto } from './models/dto/res/user-base.res.dto';
import { UserMapper } from './services/user.mapper';
import { UsersService } from './services/users.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //user
  @Get('me')
  public async me(@CurrentUser() userData: IUserData): Promise<UserBaseResDto> {
    const result = await this.usersService.me(userData);
    return UserMapper.toResDto(result);
  }

  @Patch('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateUserReqDto,
  ): Promise<UserBaseResDto> {
    const result = await this.usersService.updateMe(userData, dto);
    return UserMapper.toResDto(result);
  }

  @Delete('me')
  public async deleteMe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.usersService.deleteMe(userData);
  }

  @Patch('account')
  public async updateAccount(
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.updateAccount(userData);
  }
}
