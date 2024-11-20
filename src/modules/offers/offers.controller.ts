import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { OfferBaseReqDto } from './models/dto/req/offer-base.req.dto';
import { OffersService } from './services/offers.service';

@ApiBearerAuth()
@ApiTags('offers')
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async create(@Body() createUserDto: OfferBaseReqDto) {
    return await this.offersService.create();
  }
}
