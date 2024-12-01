import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RoleEnum } from '../../common/enums/role.enum';
import { UserID } from '../../common/types/entity-ids.type';
import { Roles } from '../accessControl/decorators/roles.decorator';
import { RolesGuard } from '../accessControl/roles.guard';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { ListOfferQueryDto } from '../offers/models/dto/req/list-offer-query.dto';
import { ListOfferResDto } from '../offers/models/dto/res/list-offer.res.dto';
import { OfferMapper } from '../offers/services/offer.mapper';
import { ListUserQueryDto } from './models/dto/req/list-user-query.dto';
import { ListUserResDto } from './models/dto/res/list-user.res.dto';
import { UserBaseResDto } from './models/dto/res/user-base.res.dto';
import { UserMapper } from './services/user.mapper';
import { UsersAdminService } from './services/users-admin.service';

@ApiBearerAuth()
@ApiTags('users-admin')
@Controller('users-admin')
export class UsersAdminController {
  constructor(private readonly usersAdminService: UsersAdminService) {}

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Get('users')
  @ApiOperation({ summary: 'List of all users' })
  public async findAll(
    @Query() query: ListUserQueryDto,
  ): Promise<ListUserResDto> {
    const [entities, total] = await this.usersAdminService.findAll(query);
    return UserMapper.toResDtoList(entities, total, query);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Get(':userId')
  @ApiOperation({ summary: 'Find user by id' })
  public async findOne(
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<UserBaseResDto> {
    const result = await this.usersAdminService.findOne(userId);
    return UserMapper.toResDto(result);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Patch('ban:userId')
  @ApiOperation({ summary: 'Ban user' })
  public async ban(
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<void> {
    await this.usersAdminService.ban(userId);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Patch('restoreUser:userId')
  @ApiOperation({ summary: 'Unban user' })
  public async restoreUser(
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<void> {
    await this.usersAdminService.restoreUser(userId);
  }
}
