import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { OfferBaseReqDto } from './models/dto/req/offer-base.req.dto';
import { OffersService } from './services/offers.service';

@ApiBearerAuth()
@ApiTags('offers')
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  //user
  @Get()
  public async getAll() {
    return await this.offersService.getAll();
  }

  @Post()
  public async create(@Body() createOfferDto: OfferBaseReqDto) {
    return await this.offersService.create();
  }

  @Patch(':offerId')
  public async update(@Body() updateOfferDto: OfferBaseReqDto) {
    return await this.offersService.update();
  }

  @Get(':offerId')
  public async get() {
    return await this.offersService.getById();
  }

  @Get('my-offers')
  public async getMyOffers() {
    return await this.offersService.getMyOffers();
  }

  @Delete(':offerId')
  public async deleteMy() {
    return await this.offersService.deleteMy();
  }

  //manager
  @Patch(':offerId/activate')
  public async activate() {
    return await this.offersService.activate();
  }

  @Patch(':offerId/deactivate')
  public async deactivate() {
    return await this.offersService.deactivate();
  }

  //todo maybe the same delete with permission
  // @Delete(':offerId')
  // public async delete() {
  //   return await this.offersService.delete();
  // }
}
