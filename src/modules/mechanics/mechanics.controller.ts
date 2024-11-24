import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { MechanicID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { MechanicsBaseReqDto } from './models/dto/req/mechanics-base.req.dto';
import { MechanicsUpdateReqDto } from './models/dto/req/mechanics-update.req.dto';
import { MechanicsBaseResDto } from './models/dto/res/mechanics-base.res.dto';
import { MechanicMapper } from './services/mechanic.mapper';
import { MechanicsService } from './services/mechanics.service';

@ApiBearerAuth()
@ApiTags('mechanics')
@Controller('mechanics')
export class MechanicsController {
  constructor(private readonly mechanicsService: MechanicsService) {}

  //todo воно працює, але для того треба створити спочатку салон
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: MechanicsBaseReqDto,
  ): Promise<MechanicsBaseResDto> {
    const result = await this.mechanicsService.create(userData, dto);
    return MechanicMapper.toResDto(result);
  }

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

  @Get(':mechanicId')
  public async get() {
    return await this.mechanicsService.get();
  }

  @Get(':showroomId')
  public async getAll() {
    return await this.mechanicsService.getAll();
  }

  //todo user only his and manager all
  @Patch(':mechanicId')
  public async delete() {
    return await this.mechanicsService.delete();
  }

  @Get()
  public async getMechanics() {
    return await this.mechanicsService.getMechanics();
  }
}
