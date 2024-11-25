import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CarShowroomID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
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
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CarShowroomBaseReqDto,
  ): Promise<CarShowroomBaseResDto> {
    const result = await this.carShowroomService.create(userData, dto);
    return CarShowroomMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @Patch('my-showroom')
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
  @Delete('my-showroom')
  public async deleteMyShowroom(
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.carShowroomService.deleteMyShowroom(userData);
  }

  @ApiBearerAuth()
  @Get('my-showroom')
  public async getMyShowRoom(
    @CurrentUser() userData: IUserData,
  ): Promise<CarShowroomBaseResDto> {
    const result = await this.carShowroomService.getMyShowRoom(userData);
    return CarShowroomMapper.toResDto(result);
  }

  //for all
  @SkipAuth()
  @Get()
  public async findAll(
    @Query() query: ListCarShowroomQueryDto,
  ): Promise<ListCarShowroomResDto> {
    const [entities, total] = await this.carShowroomService.findAll(query);
    return CarShowroomMapper.toResDtoList(entities, total, query);
  }

  //manager
  @ApiBearerAuth()
  @Get(':showroomId')
  public async getShowroom(
    @Param('showroomId') showroomId: CarShowroomID,
  ): Promise<CarShowroomBaseResDto> {
    const result = await this.carShowroomService.getShowroom(showroomId);
    return CarShowroomMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @Delete(':showroomId')
  public async deleteShowroom(
    @Param('showroomId') showroomId: CarShowroomID,
  ): Promise<void> {
    await this.carShowroomService.deleteShowroom(showroomId);
  }
}
