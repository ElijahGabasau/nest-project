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
import { CarShowroomID } from '../../common/types/entity-ids.type';
import { Roles } from '../accessControl/decorators/roles.decorator';
import { RolesGuard } from '../accessControl/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { CarShowroomBaseReqDto } from './models/dto/req/car-showroom-base.req.dto';
import { CarShowroomUpdateReqDto } from './models/dto/req/car-showroom-update.req.dto';
import { ListCarShowroomQueryDto } from './models/dto/req/list-car-showroom-query.dto';
import { CarShowroomBaseResDto } from './models/dto/res/car-showroom-base.res.dto';
import { ListCarShowroomResDto } from './models/dto/res/list-car-showroom.res.dto';
import { CarShowroomMapper } from './services/car-showroom.mapper';
import { CarShowroomService } from './services/car-showroom.service';

@ApiTags('showroom')
@Controller('showroom')
export class CarShowroomController {
  constructor(private readonly carShowroomService: CarShowroomService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @Post()
  @ApiOperation({ summary: 'Create showroom' })
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CarShowroomBaseReqDto,
  ): Promise<CarShowroomBaseResDto> {
    const result = await this.carShowroomService.create(userData, dto);
    return CarShowroomMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @Patch('my-showroom')
  @ApiOperation({ summary: 'Update my showroom' })
  public async updateMyShowroom(
    @CurrentUser() userData: IUserData,
    @Body() dto: CarShowroomUpdateReqDto,
  ): Promise<CarShowroomBaseResDto> {
    const result = await this.carShowroomService.updateMyShowroom(
      userData,
      dto,
    );
    return CarShowroomMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @Delete('my-showroom')
  @ApiOperation({ summary: 'Delete my showroom' })
  public async deleteMyShowroom(
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.carShowroomService.deleteMyShowroom(userData);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @Get('my-showroom')
  @ApiOperation({ summary: 'Get my showroom' })
  public async getMyShowroom(
    @CurrentUser() userData: IUserData,
  ): Promise<CarShowroomBaseResDto> {
    const result = await this.carShowroomService.getMyShowroom(userData);
    return CarShowroomMapper.toResDto(result);
  }

  @SkipAuth()
  @Get()
  @ApiOperation({ summary: 'Get all showrooms and search by name' })
  public async findAll(
    @Query() query: ListCarShowroomQueryDto,
  ): Promise<ListCarShowroomResDto> {
    const [entities, total] = await this.carShowroomService.findAll(query);
    return CarShowroomMapper.toResDtoList(entities, total, query);
  }

  @ApiBearerAuth()
  @Get(':showroomId')
  @ApiOperation({ summary: 'Get showroom by id' })
  public async getShowroom(
    @Param('showroomId') showroomId: CarShowroomID,
  ): Promise<CarShowroomBaseResDto> {
    const result = await this.carShowroomService.getShowroom(showroomId);
    return CarShowroomMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.SHOWROOM_ADMIN, RoleEnum.SHOWROOM_SUPER_ADMIN)
  @Delete(':showroomId')
  @ApiOperation({ summary: 'Delete showroom by id' })
  public async deleteShowroom(
    @Param('showroomId') showroomId: CarShowroomID,
  ): Promise<void> {
    await this.carShowroomService.deleteShowroom(showroomId);
  }
}
