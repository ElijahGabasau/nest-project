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

import { CarShowroomID, MechanicID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
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
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: MechanicsBaseReqDto,
  ): Promise<MechanicsBaseResDto> {
    const result = await this.mechanicsService.create(userData, dto);
    return MechanicMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @Patch(':mechanicId')
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
  //todo check with another user

  @SkipAuth()
  @Get('all-mechanics')
  public async getAll(
    // @CurrentUser() userData: IUserData,
    @Query() query: ListMechanicQueryDto,
  ): Promise<ListMechanicsResDto> {
    const [entities, total] = await this.mechanicsService.getAll(
      // userData,
      query,
    );
    return MechanicMapper.toResDtoList(entities, total, query);
  }
  @ApiBearerAuth()
  @Get(':mechanicId')
  public async getById(
    @CurrentUser() userData: IUserData,
    @Param('mechanicId') mechanicId: MechanicID,
  ): Promise<MechanicsBaseResDto> {
    const result = await this.mechanicsService.getById(userData, mechanicId);
    return MechanicMapper.toResDto(result);
  }

  //todo user only his and manager all
  @ApiBearerAuth()
  @Delete(':mechanicId')
  public async deleteMyMechanic(
    @CurrentUser() userData: IUserData,
    @Param('mechanicId') mechanicId: MechanicID,
  ): Promise<void> {
    await this.mechanicsService.deleteMyMechanic(userData, mechanicId);
  }

  @ApiBearerAuth()
  @Delete('admin:mechanicId')
  public async deleteById(
    @CurrentUser() userData: IUserData,
    @Param('mechanicId') mechanicId: MechanicID,
  ): Promise<void> {
    await this.mechanicsService.deleteById(userData, mechanicId);
  }
}
