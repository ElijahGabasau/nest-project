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

import { OfferID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { CarBrandReqDto } from './models/dto/req/car-brand.req.dto';
import { ListOfferQueryDto } from './models/dto/req/list-offer-query.dto';
import { OfferBaseReqDto } from './models/dto/req/offer-base.req.dto';
import { UpdateOfferReqDto } from './models/dto/req/update-offer.req.dto';
import { CarBrandResDto } from './models/dto/res/car-brand.res.dto';
import { ListOfferResDto } from './models/dto/res/list-offer.res.dto';
import { OfferBaseResDto } from './models/dto/res/offer-base.res.dto';
import { OfferMapper } from './services/offer.mapper';
import { OffersService } from './services/offers.service';

@ApiTags('offers')
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  //user
  @SkipAuth()
  @Get()
  public async findAll(
    @Query() query: ListOfferQueryDto,
  ): Promise<ListOfferResDto> {
    const [entities, total] = await this.offersService.findAll(query);
    return OfferMapper.toResDtoList(entities, total, query);
  }

  //todo delete todo only when I finish everything with this controller
  @ApiBearerAuth()
  @Post()
  public async createOffer(
    @CurrentUser() userData: IUserData,
    @Body() dto: OfferBaseReqDto,
  ): Promise<OfferBaseResDto> {
    const result = await this.offersService.createOffer(userData, dto);
    return OfferMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @Patch('my-offer:offerId')
  public async updateMyOffer(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateOfferReqDto,
    @Param('offerId') offerId: OfferID,
  ): Promise<OfferBaseResDto> {
    const result = await this.offersService.updateMyOffer(
      userData,
      dto,
      offerId,
    );
    return OfferMapper.toResDto(result);
  }

  @SkipAuth()
  @Get(':offerId')
  public async get(@Param('offerId') offerId: OfferID) {
    const result = await this.offersService.getById(offerId);
    return OfferMapper.toResDto(result);
  }
  //todo fix this
  @ApiBearerAuth()
  @Get('myOffers')
  public async getMyOffers(
    @CurrentUser() userData: IUserData,
  ): Promise<OfferBaseResDto[]> {
    const result = await this.offersService.getMyOffers(userData);
    return result.map((offer) => OfferMapper.toResDto(offer));
  }

  @ApiBearerAuth()
  @Delete('my-offer:offerId')
  public async deleteMyOffer(
    @CurrentUser() userData: IUserData,
    @Param('offerId') offerId: OfferID,
  ): Promise<void> {
    await this.offersService.deleteMyOffer(userData, offerId);
  }

  //manager
  @ApiBearerAuth()
  @Patch(':offerId/activate')
  public async activate(
    @CurrentUser() userData: IUserData,
    @Param('offerId') offerId: OfferID,
  ): Promise<void> {
    await this.offersService.activate(userData, offerId);
  }

  @ApiBearerAuth()
  @Patch(':offerId/deactivate')
  public async deactivate(
    @CurrentUser() userData: IUserData,
    @Param('offerId') offerId: OfferID,
  ): Promise<void> {
    await this.offersService.deactivate(userData, offerId);
  }

  @ApiBearerAuth()
  @Post('add-car-brand')
  public async addCarBrand(
    @CurrentUser() userData: IUserData,
    @Body() dto: CarBrandReqDto,
  ): Promise<CarBrandResDto> {
    const result = await this.offersService.addCarBrand(userData, dto);
    return OfferMapper.toResDtoBrand(result);
  }

  //todo maybe the same delete with permission
  // @Delete(':offerId')
  // public async delete() {
  //   return await this.offersService.delete();
  // }
}
