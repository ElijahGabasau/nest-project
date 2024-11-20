import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CarShowroomBaseReqDto } from './models/dto/req/car-showroom-base.req.dto';
import { CarShowroomService } from './services/car-showroom.service';

// @ApiBearerAuth()
@ApiTags('showroom')
@Controller('showroom')
export class CarShowroomController {
  constructor(private readonly carShowroomService: CarShowroomService) {}

  @Post()
  public async create(@Body() createUserDto: CarShowroomBaseReqDto) {
    return await this.carShowroomService.create();
  }

  @Patch(':showroomId')
  public async update(@Body() updateUserDto: CarShowroomBaseReqDto) {
    return await this.carShowroomService.update();
  }
  //todo for manager also
  @Delete(':showroomId')
  public async delete() {
    return await this.carShowroomService.delete();
  }

  @Get(':userId')
  public async get() {
    return await this.carShowroomService.getMy();
  }

  //todo query
  @Get()
  public async getAll() {
    return await this.carShowroomService.getAll();
  }

  //manager
  @Get(':showroomId')
  public async getShowroom() {
    return await this.carShowroomService.get();
  }
}
