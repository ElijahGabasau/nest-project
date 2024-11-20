import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { MechanicsBaseReqDto } from './models/dto/req/mechanics-base.req.dto';
import { MechanicsService } from './services/mechanics.service';

// @ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class MechanicsController {
  constructor(private readonly usersService: MechanicsService) {}

  @Post()
  async create(@Body() createUserDto: MechanicsBaseReqDto) {
    return await this.usersService.create();
  }
}
