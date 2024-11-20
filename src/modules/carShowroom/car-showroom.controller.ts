import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CarShowroomBaseReqDto } from './models/dto/req/car-showroom-base.req.dto';
import { CarShowroomService } from './services/car-showroom.service';

// @ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class CarShowroomController {
  constructor(private readonly usersService: CarShowroomService) {}

  @Post()
  async create(@Body() createUserDto: CarShowroomBaseReqDto) {
    return await this.usersService.create();
  }
}
