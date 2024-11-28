import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RoleEnum } from '../../common/enums/role.enum';
import { Roles } from '../accessControl/decorators/roles.decorator';
import { RolesGuard } from '../accessControl/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
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

  @Get('me')
  @ApiOperation({ summary: 'Information about user' })
  public async me(@CurrentUser() userData: IUserData): Promise<UserBaseResDto> {
    const result = await this.usersService.me(userData);
    return UserMapper.toResDto(result);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @Patch('me')
  @ApiOperation({ summary: 'Update user information (only user)' })
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateUserReqDto,
  ): Promise<UserBaseResDto> {
    const result = await this.usersService.updateMe(userData, dto);
    return UserMapper.toResDto(result);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @Delete('me')
  @ApiOperation({ summary: 'Delete user (only user)' })
  public async deleteMe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.usersService.deleteMe(userData);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @Patch('account')
  @ApiOperation({ summary: 'Update user account to Premium (only user)' })
  public async updateAccount(
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.updateAccount(userData);
  }
}
