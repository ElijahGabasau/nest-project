import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { OfferID } from '../../../common/types/entity-ids.type';
import { CarBrandEntity } from '../../../database/entities/car-brand.entity';
import { OfferEntity } from '../../../database/entities/offer.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { CarBrandRepository } from '../../repository/services/car-brand.repository';
import { OfferRepository } from '../../repository/services/offer.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { ViewRepository } from '../../repository/services/view.repository';
import { AccountEnum } from '../../users/models/enums/account.enum';
import { CurrencyConverterHelper } from '../helpers/currency-converter.helper';
import { CarBrandReqDto } from '../models/dto/req/car-brand.req.dto';
import { ListOfferQueryDto } from '../models/dto/req/list-offer-query.dto';
import { OfferBaseReqDto } from '../models/dto/req/offer-base.req.dto';
import { UpdateOfferReqDto } from '../models/dto/req/update-offer.req.dto';
import { CurrencyService } from './currency.service';

@Injectable()
export class OffersService {
  constructor(
    private readonly offerRepository: OfferRepository,
    private readonly currencyService: CurrencyService,
    private readonly userRepository: UserRepository,
    private readonly viewRepository: ViewRepository,
    private readonly carBrandRepository: CarBrandRepository,
  ) {}
  public async findAll(
    query: ListOfferQueryDto,
  ): Promise<[OfferEntity[], number]> {
    return await this.offerRepository.findAll(query);
  }
  //todo delete todo only when I finish everything with this controller!!!!!!!!!!!!!!!!WHOLE CONTROLLER!!!
  public async createOffer(
    userData: IUserData,
    dto: OfferBaseReqDto,
  ): Promise<OfferEntity> {
    //todo check is user not banned
    const user = await this.userRepository.findOneBy({
      id: userData.userId,
      isDeleted: false,
    });
    if (!user) {
      throw new ConflictException('User is banned or deleted');
    }
    //todo check by account type
    if (user.account === AccountEnum.BASIC) {
      const offerCount = await this.offerRepository.count({
        where: { user_id: user.id },
      });

      if (offerCount >= 1) {
        throw new ForbiddenException(
          'Basic account users can create only one offer.If you want to create more, please upgrade your account',
        );
      }
    }

    //todo check bad-word filter
    //todo mailer for bad words
    //todo check brand + mailer and connect

    //todo currency rate
    const currencyRate = await this.currencyService.getCurrency(dto.currency);
    //todo convert price to UAH
    const priceInUAH = await CurrencyConverterHelper.convertInUAH(
      dto.currency,
      dto.price,
      this.currencyService,
    );
    const offer = await this.offerRepository.save(
      this.offerRepository.create({
        ...dto,
        currencyRate: currencyRate,
        priceInUAH: priceInUAH,
        user_id: userData.userId,
      }),
    );

    return offer;
  }

  public async updateMyOffer(
    userData: IUserData,
    dto: UpdateOfferReqDto,
    offerId: OfferID,
  ): Promise<OfferEntity> {
    const offer = await this.offerRepository.findOneBy({
      id: offerId,
      user_id: userData.userId,
    });
    if (!offer) {
      throw new ConflictException('Offer not found or not yours');
    }
    const currencyRate = await this.currencyService.getCurrency(dto.currency);
    const priceInUAH = await CurrencyConverterHelper.convertInUAH(
      dto.currency,
      dto.price,
      this.currencyService,
    );
    return await this.offerRepository.save({
      ...offer,
      ...dto,
      currencyRate,
      priceInUAH,
    });
  }

  public async getById(offerId: OfferID): Promise<OfferEntity> {
    const offer = await this.offerRepository.findOneBy({ id: offerId });
    if (!offer) {
      throw new ConflictException('Offer not found');
    }
    const view = await this.viewRepository.findOneBy({
      offer_id: offerId,
    });
    if (!view) {
      await this.viewRepository.save(
        this.viewRepository.create({ offer_id: offerId }),
      );
    }
    return offer;
  }

  //todo fix this
  public async getMyOffers(userData: IUserData): Promise<OfferEntity[]> {
    return await this.offerRepository.findBy({
      user_id: userData.userId,
    });
  }

  public async deleteMyOffer(
    userData: IUserData,
    offerId: OfferID,
  ): Promise<void> {
    const offer = await this.offerRepository.findOneBy({
      id: offerId,
      user_id: userData.userId,
    });
    if (!offer) {
      throw new ConflictException('Offer not found or not yours');
    }
    await this.offerRepository.delete({ id: offerId });
  }

  public async activate(userData: IUserData, offerId: OfferID): Promise<void> {
    const offer = await this.offerRepository.findOneBy({ id: offerId });
    if (!offer) {
      throw new ConflictException('Offer not found');
    }
    await this.offerRepository.update({ id: offerId }, { isActive: true });
  }

  public async deactivate(
    userData: IUserData,
    offerId: OfferID,
  ): Promise<void> {
    const offer = await this.offerRepository.findOneBy({ id: offerId });
    if (!offer) {
      throw new ConflictException('Offer not found');
    }
    await this.offerRepository.update({ id: offerId }, { isActive: false });
  }

  //todo fix
  public async addCarBrand(
    userData: IUserData,
    dto: CarBrandReqDto,
  ): Promise<CarBrandEntity> {
    const carBrand = await this.carBrandRepository.save(
      this.carBrandRepository.create({
        ...dto,
      }),
    );
    return carBrand;
  }
}
