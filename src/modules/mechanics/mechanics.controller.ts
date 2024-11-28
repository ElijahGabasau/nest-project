import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RoleEnum } from '../../common/enums/role.enum';
import { MechanicID } from '../../common/types/entity-ids.type';
import { Roles } from '../accessControl/decorators/roles.decorator';
import { RolesGuard } from '../accessControl/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { ListMechanicQueryDto } from './models/dto/req/list-mechanic-query.dto';
import { MechanicsBaseReqDto } from './models/dto/req/mechanics-base.req.dto';
import { MechanicsUpdateReqDto } from './models/dto/req/mechanics-update.req.dto';
import { ListMechanicsResDto } from './models/dto/res/list-mechanics.res.dto';
import { MechanicsBaseResDto } from './models/dto/res/mechanics-base.res.dto';
import { MechanicMapper } from './services/mechanic.mapper';
import { MechanicsService } from './services/mechanics.service';

@ApiTags('mechanics')
@Controller('mechanics')
export class MechanicsController {
  constructor(private readonly mechanicsService: MechanicsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @Post()
  @ApiOperation({ summary: 'Create mechanic' })
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: MechanicsBaseReqDto,
  ): Promise<MechanicsBaseResDto> {
    const result = await this.mechanicsService.create(userData, dto);
    return MechanicMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @Patch('/my-mechanic:mechanicId')
  @ApiOperation({ summary: 'Update mechanic information' })
  public async update(
    @CurrentUser() userData: IUserData,
    @Body() dto: MechanicsUpdateReqDto,
    @Param('mechanicId') mechanicId: MechanicID,
  ): Promise<MechanicsBaseResDto> {
    const result = await this.mechanicsService.update(
      userData,
      dto,
      mechanicId,
    );
    return MechanicMapper.toResDto(result);
  }

  @SkipAuth()
  @Get('all-mechanics')
  @ApiOperation({
    summary: 'Get all mechanics and search by name or showroom ID',
  })
  public async getAll(
    @Query() query: ListMechanicQueryDto,
  ): Promise<ListMechanicsResDto> {
    const [entities, total] = await this.mechanicsService.getAll(query);
    return MechanicMapper.toResDtoList(entities, total, query);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @Get('/my-mechanic:mechanicId')
  @ApiOperation({ summary: 'Get my mechanic by ID' })
  public async getMyMechanic(
    @CurrentUser() userData: IUserData,
    @Param('mechanicId') mechanicId: MechanicID,
  ): Promise<MechanicsBaseResDto> {
    const result = await this.mechanicsService.getMyMechanic(
      userData,
      mechanicId,
    );
    return MechanicMapper.toResDto(result);
  }

  @SkipAuth()
  @Get(':mechanicId')
  @ApiOperation({ summary: 'Get mechanic by ID' })
  public async getById(
    @Param('mechanicId') mechanicId: MechanicID,
  ): Promise<MechanicsBaseResDto> {
    const result = await this.mechanicsService.getById(mechanicId);
    return MechanicMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @Delete('/my-mechanic:mechanicId')
  @ApiOperation({ summary: 'Delete my mechanic by ID' })
  public async deleteMyMechanic(
    @CurrentUser() userData: IUserData,
    @Param('mechanicId') mechanicId: MechanicID,
  ): Promise<void> {
    await this.mechanicsService.deleteMyMechanic(userData, mechanicId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.SHOWROOM_ADMIN, RoleEnum.SHOWROOM_SUPER_ADMIN)
  @Delete(':mechanicId')
  @ApiOperation({ summary: 'Delete mechanic by ID' })
  public async deleteById(
    @Param('mechanicId') mechanicId: MechanicID,
  ): Promise<void> {
    await this.mechanicsService.deleteById(mechanicId);
  }
}
