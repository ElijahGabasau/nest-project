import { ConflictException, Injectable } from '@nestjs/common';

import { OfferID, UserID } from '../../../common/types/entity-ids.type';
import { CarBrandEntity } from '../../../database/entities/car-brand.entity';
import { OfferEntity } from '../../../database/entities/offer.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { MailService } from '../../mail/services/mail.service';
import { CarBrandRepository } from '../../repository/services/car-brand.repository';
import { OfferRepository } from '../../repository/services/offer.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { CurrencyEnum } from '../models/enums/currency.enum';
import { StatusEnum } from '../models/enums/status.enum';
import { CurrencyService } from '../services/currency.service';
import { CheckProfanityHelper } from './check-profanity.helper';
import { CurrencyConverterHelper } from './currency-converter.helper';

@Injectable()
export class OfferHelper {
  public static async checkAccessToOffer(
    offerRepository: OfferRepository,
    offerId: OfferID,
    userData: IUserData,
  ): Promise<OfferEntity> {
    const offer = await offerRepository.findOneBy({
      id: offerId,
      user_id: userData.userId,
    });
    if (!offer) {
      throw new ConflictException('Offer not found or not yours');
    }
    return offer;
  }

  public static async checkUserStatus(
    userRepository: UserRepository,
    userId: UserID,
  ): Promise<UserEntity> {
    const user = await userRepository.findOneBy({
      id: userId,
      isActive: true,
    });
    if (!user) {
      throw new ConflictException('User is banned or deleted');
    }
    return user;
  }

  public static async validateLocation(
    city: string,
    region: string,
  ): Promise<void> {
    if (!city && !region) {
      throw new ConflictException(' City or region must be filled');
    }
  }

  public static async validateBrand(
    carBrandRepository: CarBrandRepository,
    brandName: string,
    mailService: MailService,
  ): Promise<CarBrandEntity> {
    const brand = await carBrandRepository.findOneBy({ brand: brandName });
    if (!brand) {
      await mailService.sendMessageAboutAddingCarBrand(brandName);
      throw new ConflictException('Brand not found and mail sent');
    }
    return brand;
  }

  public static async getConvertedPrice(
    currencyService: CurrencyService,
    currency: CurrencyEnum,
    price: number,
  ): Promise<{ currencyRate: number; priceInUAH: number }> {
    const currencyRate = await currencyService.getCurrency(currency);
    const priceInUAH = await CurrencyConverterHelper.convertInUAH(
      currency,
      price,
      currencyService,
    );
    return { currencyRate, priceInUAH };
  }

  public static async validateProfanity(
    text: string,
    offer: OfferEntity,
    offerRepository: OfferRepository,
  ): Promise<void> {
    const isBadWord = await CheckProfanityHelper.checkProfanity(text);
    if (!isBadWord) {
      offer.status = StatusEnum.ACTIVE;
      await offerRepository.save(offer);
    }
  }

  public static async checkUserOfferForStatus(
    offerRepository: OfferRepository,
    offerId: OfferID,
  ): Promise<void> {
    const offer = await offerRepository.findOneBy({
      id: offerId,
      isSalon: false,
    });
    if (!offer) {
      throw new ConflictException('Offer not found or it is showroom offer');
    }
  }

  public static async checkShowroomOfferForStatus(
    offerRepository: OfferRepository,
    offerId: OfferID,
  ): Promise<void> {
    const offer = await offerRepository.findOneBy({
      id: offerId,
      isSalon: true,
    });
    if (!offer) {
      throw new ConflictException('Offer not found or it is user offer');
    }
  }
}
