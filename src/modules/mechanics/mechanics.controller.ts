import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { MechanicsBaseReqDto } from './models/dto/req/mechanics-base.req.dto';
import { MechanicsService } from './services/mechanics.service';

// @ApiBearerAuth()
@ApiTags('mechanics')
@Controller('mechanics')
export class MechanicsController {
  constructor(private readonly mechanicsService: MechanicsService) {}

  @Post()
  public async create(@Body() createUserDto: MechanicsBaseReqDto) {
    return await this.mechanicsService.create();
  }

  @Patch(':mechanicId')
  public async update(@Body() updateUserDto: MechanicsBaseReqDto) {
    return await this.mechanicsService.update();
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
  @Delete(':mechanicId')
  public async delete() {
    return await this.mechanicsService.delete();
  }

  @Get()
  public async getMechanics() {
    return await this.mechanicsService.getMechanics();
  }
}
