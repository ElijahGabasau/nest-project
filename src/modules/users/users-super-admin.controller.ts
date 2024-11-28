import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RoleEnum } from '../../common/enums/role.enum';
import { UserID } from '../../common/types/entity-ids.type';
import { Permissions } from '../accessControl/decorators/permissions.decorator';
import { Roles } from '../accessControl/decorators/roles.decorator';
import { PermissionEnum } from '../accessControl/enums/permission.enum';
import { PermissionsGuard } from '../accessControl/permissions.guard';
import { RolesGuard } from '../accessControl/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { UserAdminBaseReqDto } from './models/dto/req/user-admin-base.req.dto';
import { UserAdminResDto } from './models/dto/res/user-admin.res.dto';
import { UserBaseResDto } from './models/dto/res/user-base.res.dto';
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
  @ApiOperation({ summary: 'Create a new super admin' })
  public async createSuperAdmin(
    @Body() dto: UserAdminBaseReqDto,
  ): Promise<UserAdminResDto> {
    const result = await this.usersSuperAdminService.createSuperAdmin(dto);
    return UserMapper.toAdminResDto(result);
  }
  @SkipAuth()
  @Post('create-super-admin-showroom')
  @ApiOperation({ summary: 'Create a new super admin for showrooms' })
  public async createSuperAdminShowroom(
    @Body() dto: UserAdminBaseReqDto,
  ): Promise<UserAdminResDto> {
    const result =
      await this.usersSuperAdminService.createSuperAdminShowroom(dto);
    return UserMapper.toAdminResDto(result);
  }

  @Post('create-admin')
  @ApiOperation({ summary: 'Create a new admin' })
  @UseGuards(JwtAccessGuard, PermissionsGuard)
  @Permissions(PermissionEnum.CREATE_ADMIN)
  @ApiBearerAuth()
  public async createAdmin(
    @CurrentUser() userData: IUserData,
    @Body() dto: UserAdminBaseReqDto,
  ): Promise<UserAdminResDto> {
    const result = await this.usersSuperAdminService.createAdmin(dto);
    return UserMapper.toAdminResDto(result);
  }

  @Post('create-admin-showroom')
  @ApiOperation({ summary: 'Create a new admin for showroom' })
  @UseGuards(JwtAccessGuard, PermissionsGuard)
  @Permissions(PermissionEnum.CREATE_SHOWROOM_ADMIN)
  @ApiBearerAuth()
  public async createAdminShowroom(
    @CurrentUser() userData: IUserData,
    @Body() dto: UserAdminBaseReqDto,
  ): Promise<UserAdminResDto> {
    const result = await this.usersSuperAdminService.createAdminShowroom(dto);
    return UserMapper.toAdminResDto(result);
  }

  @UseGuards(JwtAccessGuard, PermissionsGuard)
  @Permissions(PermissionEnum.DELETE_BY_ID_SUPER_ADMIN)
  @ApiBearerAuth()
  @Delete('/delete:userId')
  @ApiOperation({ summary: 'Delete admin or user' })
  public async deleteOne(
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<void> {
    await this.usersSuperAdminService.deleteOne(userId);
  }

  @UseGuards(JwtAccessGuard, PermissionsGuard)
  @Permissions(PermissionEnum.DELETE_BY_ID_SHOWROOM_SUPER_ADMIN)
  @ApiBearerAuth()
  @Delete('/deleteShowroomAdmin:userId')
  @ApiOperation({ summary: 'Delete admin for showroom' })
  public async deleteOneShowroom(
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<void> {
    await this.usersSuperAdminService.deleteOneShowroom(userId);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.SHOWROOM_SUPER_ADMIN)
  @ApiBearerAuth()
  @Get(':role')
  @ApiOperation({ summary: 'Find all by role' })
  public async findByRole(
    @Param('role') role: RoleEnum,
  ): Promise<UserBaseResDto[]> {
    const result = await this.usersSuperAdminService.findByRole(role);
    return result.map((user) => UserMapper.toResDto(user));
  }
}
