import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RoleEnum } from '../../common/enums/role.enum';
import { UserID } from '../../common/types/entity-ids.type';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { UserAdminBaseReqDto } from './models/dto/req/user-admin-base.req.dto';
import { UserAdminResDto } from './models/dto/res/user-admin.res.dto';
import { UserBaseResDto } from './models/dto/res/user-base.res.dto';
import { UserShortResDto } from './models/dto/res/user-short.res.dto';
import { UserMapper } from './services/user.mapper';
import { UsersSuperAdminService } from './services/users-super-admin.service';

@ApiTags('users-super-admin')
@Controller('users-super-admin')
export class UsersSuperAdminController {
  constructor(
    private readonly usersSuperAdminService: UsersSuperAdminService,
  ) {}

  @SkipAuth()
  @Post('create-super-admin')
  public async createSuperAdmin(
    @Body() dto: UserAdminBaseReqDto,
  ): Promise<UserAdminResDto> {
    const result = await this.usersSuperAdminService.createSuperAdmin(dto);
    return UserMapper.toAdminResDto(result);
  }

  @ApiBearerAuth()
  @Post('create-manager')
  public async createManager(
    @Body() dto: UserAdminBaseReqDto,
  ): Promise<UserAdminResDto> {
    const result = await this.usersSuperAdminService.createManager(dto);
    return UserMapper.toAdminResDto(result);
  }

  @ApiBearerAuth()
  @Patch('/delete:userId')
  public async deleteOne(
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<void> {
    await this.usersSuperAdminService.deleteOne(userId);
  }

  @ApiBearerAuth()
  @Get(':role')
  public async findByRole(
    @Param('role') role: RoleEnum,
  ): Promise<UserBaseResDto[]> {
    const result = await this.usersSuperAdminService.findByRole(role);
    return result.map((user) => UserMapper.toResDto(user));
  }
}
