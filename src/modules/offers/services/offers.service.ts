import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { OfferID } from '../../../common/types/entity-ids.type';
import { CarBrandEntity } from '../../../database/entities/car-brand.entity';
import { OfferEntity } from '../../../database/entities/offer.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { MailService } from '../../mail/services/mail.service';
import { CarBrandRepository } from '../../repository/services/car-brand.repository';
import { OfferRepository } from '../../repository/services/offer.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { ViewRepository } from '../../repository/services/view.repository';
import { AccountEnum } from '../../users/models/enums/account.enum';
import { CheckProfanityHelper } from '../helpers/check-profanity.helper';
import { CurrencyConverterHelper } from '../helpers/currency-converter.helper';
import { CarBrandReqDto } from '../models/dto/req/car-brand.req.dto';
import { ListOfferQueryDto } from '../models/dto/req/list-offer-query.dto';
import { OfferBaseReqDto } from '../models/dto/req/offer-base.req.dto';
import { UpdateOfferReqDto } from '../models/dto/req/update-offer.req.dto';
import { StatusEnum } from '../models/enums/status.enum';
import { CurrencyService } from './currency.service';

@Injectable()
export class OffersService {
  constructor(
    private readonly offerRepository: OfferRepository,
    private readonly currencyService: CurrencyService,
    private readonly userRepository: UserRepository,
    private readonly viewRepository: ViewRepository,
    private readonly carBrandRepository: CarBrandRepository,
    private readonly mailService: MailService,
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
    // check is user not banned
    const user = await this.userRepository.findOneBy({
      id: userData.userId,
      isDeleted: false,
    });
    if (!user) {
      throw new ConflictException('User is banned or deleted');
    }
    // check by account type
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
    // check brand
    const brand = await this.carBrandRepository.findOneBy({ brand: dto.brand });
    if (!brand) {
      await this.mailService.sendMessageAboutAddingCarBrand(dto.brand);
      throw new ConflictException('Brand not found and mail sent');
    }

    // currency rate
    const currencyRate = await this.currencyService.getCurrency(dto.currency);
    // convert price to UAH
    const priceInUAH = await CurrencyConverterHelper.convertInUAH(
      dto.currency,
      dto.price,
      this.currencyService,
    );

    // check bad-word filter

    const offer = await this.offerRepository.save(
      this.offerRepository.create({
        ...dto,
        currencyRate: currencyRate,
        priceInUAH: priceInUAH,
        user_id: userData.userId,
      }),
    );

    const isBadWord = await CheckProfanityHelper.checkProfanity(
      `${dto.title} ${dto.description}`,
    );
    if (!isBadWord) {
      offer.status = StatusEnum.ACTIVE;
      await this.offerRepository.save(offer);
    }
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

    const isBadWord = await CheckProfanityHelper.checkProfanity(
      `${dto.title} ${dto.description}`,
    );
    if (isBadWord && offer.status === StatusEnum.ACTIVE) {
      offer.status = StatusEnum.PENDING;
      offer.attempts = 0;
    }
    if (!isBadWord && offer.status === StatusEnum.PENDING) {
      offer.status = StatusEnum.ACTIVE;
    }

    if (isBadWord && offer.status === StatusEnum.PENDING) {
      offer.attempts += 1;
    }
    if (offer.attempts >= 3) {
      offer.status = StatusEnum.INACTIVE;
      await this.mailService.sendMessageAboutCheckingPost(offerId.toString());
    }

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
    await this.viewRepository.save(
      this.viewRepository.create({ offer_id: offerId }),
    );

    return offer;
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
    await this.offerRepository.update(
      { id: offerId },
      { status: StatusEnum.ACTIVE },
    );
  }

  public async deactivate(
    userData: IUserData,
    offerId: OfferID,
  ): Promise<void> {
    const offer = await this.offerRepository.findOneBy({ id: offerId });
    if (!offer) {
      throw new ConflictException('Offer not found');
    }
    await this.offerRepository.update(
      { id: offerId },
      { status: StatusEnum.INACTIVE },
    );
  }

  public async addCarBrand(dto: CarBrandReqDto): Promise<CarBrandEntity> {
    const brand = await this.carBrandRepository.findOneBy({ brand: dto.brand });
    if (brand) {
      throw new ConflictException('Brand already exists');
    }
    return await this.carBrandRepository.save(
      this.carBrandRepository.create({
        ...dto,
      }),
    );
  }
}
