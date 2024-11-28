import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RoleEnum } from '../../common/enums/role.enum';
import { OfferID } from '../../common/types/entity-ids.type';
import { Permissions } from '../accessControl/decorators/permissions.decorator';
import { Roles } from '../accessControl/decorators/roles.decorator';
import { PermissionEnum } from '../accessControl/enums/permission.enum';
import { PermissionsGuard } from '../accessControl/permissions.guard';
import { RolesGuard } from '../accessControl/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
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

  @SkipAuth()
  @Get()
  @ApiOperation({ summary: 'Get all offers and search by brand or model' })
  public async findAll(
    @Query() query: ListOfferQueryDto,
  ): Promise<ListOfferResDto> {
    const [entities, total] = await this.offersService.findAll(query);
    return OfferMapper.toResDtoList(entities, total, query);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @Post('user-offer')
  @ApiOperation({ summary: 'Create individual user offer' })
  public async createOffer(
    @CurrentUser() userData: IUserData,
    @Body() dto: OfferBaseReqDto,
  ): Promise<OfferBaseResDto> {
    const result = await this.offersService.createOffer(userData, dto);
    return OfferMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @Post('showroom-offer')
  @ApiOperation({ summary: 'Create showroom offer' })
  public async createOfferForShowroom(
    @CurrentUser() userData: IUserData,
    @Body() dto: OfferBaseReqDto,
  ): Promise<OfferBaseResDto> {
    const result = await this.offersService.createOfferForShowroom(
      userData,
      dto,
    );
    return OfferMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @Patch('my-offer:offerId')
  @ApiOperation({ summary: 'Update offer' })
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
  @ApiOperation({ summary: 'Get offer by id' })
  public async get(@Param('offerId') offerId: OfferID) {
    const result = await this.offersService.getById(offerId);
    return OfferMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.USER)
  @Delete('my-offer:offerId')
  @ApiOperation({ summary: 'Delete user offer' })
  public async deleteMyOffer(
    @CurrentUser() userData: IUserData,
    @Param('offerId') offerId: OfferID,
  ): Promise<void> {
    await this.offersService.deleteMyOffer(userData, offerId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, PermissionsGuard)
  @Permissions(PermissionEnum.ACTIVATE_OFFER_USER)
  @Patch(':offerId/activate-offer')
  @ApiOperation({ summary: 'Activate user offer' })
  public async activateOfferUser(
    @Param('offerId') offerId: OfferID,
  ): Promise<void> {
    await this.offersService.activateOfferUser(offerId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, PermissionsGuard)
  @Permissions(PermissionEnum.DEACTIVATE_OFFER_USER)
  @Patch(':offerId/deactivate-offer')
  @ApiOperation({ summary: 'Deactivate user offer' })
  public async deactivateOfferUser(
    @Param('offerId') offerId: OfferID,
  ): Promise<void> {
    await this.offersService.deactivateOfferUser(offerId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, PermissionsGuard)
  @Permissions(PermissionEnum.ACTIVATE_OFFER_SHOWROOM)
  @Patch(':offerId/activate-offer-showroom')
  @ApiOperation({ summary: 'Activate showroom offer' })
  public async activateOfferShowroom(
    @Param('offerId') offerId: OfferID,
  ): Promise<void> {
    await this.offersService.activateOfferShowroom(offerId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, PermissionsGuard)
  @Permissions(PermissionEnum.DEACTIVATE_OFFER_SHOWROOM)
  @Patch(':offerId/deactivate-offer-showroom')
  @ApiOperation({ summary: 'Deactivate showroom offer' })
  public async deactivateOfferShowroom(
    @Param('offerId') offerId: OfferID,
  ): Promise<void> {
    await this.offersService.deactivateOfferShowroom(offerId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, PermissionsGuard)
  @Permissions(PermissionEnum.DELETE_USER_OFFER)
  @Delete('/delete-offer-user:offerId')
  @ApiOperation({ summary: 'Delete user offer' })
  public async deleteByIdUserOffer(
    @Param('offerId') offerId: OfferID,
  ): Promise<void> {
    await this.offersService.deleteByIdUserOffer(offerId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, PermissionsGuard)
  @Permissions(PermissionEnum.DELETE_SHOWROOM_OFFER)
  @Delete('/delete-offer-showroom:offerId')
  @ApiOperation({ summary: 'Delete showroom offer' })
  public async deleteByIdShowroomOffer(
    @Param('offerId') offerId: OfferID,
  ): Promise<void> {
    await this.offersService.deleteByIdShowroomOffer(offerId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Post('add-car-brand')
  @ApiOperation({ summary: 'Add car brand' })
  public async addCarBrand(
    @Body() dto: CarBrandReqDto,
  ): Promise<CarBrandResDto> {
    const result = await this.offersService.addCarBrand(dto);
    return OfferMapper.toResDtoBrand(result);
  }
}
