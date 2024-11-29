import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { OfferID } from '../../../common/types/entity-ids.type';
import { AwsConfig, Config } from '../../../configs/config.type';
import { CarBrandEntity } from '../../../database/entities/car-brand.entity';
import { OfferEntity } from '../../../database/entities/offer.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { ContentType } from '../../file-storage/enums/content-type.enum';
import { FileStorageService } from '../../file-storage/services/file-storage.service';
import { MailService } from '../../mail/services/mail.service';
import { CarBrandRepository } from '../../repository/services/car-brand.repository';
import { CarShowroomRepository } from '../../repository/services/car-showroom.repository';
import { OfferRepository } from '../../repository/services/offer.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { ViewRepository } from '../../repository/services/view.repository';
import { AccountEnum } from '../../users/models/enums/account.enum';
import { CheckProfanityHelper } from '../helpers/check-profanity.helper';
import { CurrencyConverterHelper } from '../helpers/currency-converter.helper';
import { OfferHelper } from '../helpers/offer.helper';
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
    private readonly carShowroomRepository: CarShowroomRepository,
    private readonly fileStorageService: FileStorageService,
    private readonly configService: ConfigService<Config>,
  ) {}
  public async findAll(
    query: ListOfferQueryDto,
  ): Promise<[OfferEntity[], number]> {
    return await this.offerRepository.findAll(query);
  }

  public async createOffer(
    userData: IUserData,
    dto: OfferBaseReqDto,
  ): Promise<OfferEntity> {
    // check is user not banned
    const user = await OfferHelper.checkUserStatus(
      this.userRepository,
      userData.userId,
    );
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
    const brand = await OfferHelper.validateBrand(
      this.carBrandRepository,
      dto.brand,
      this.mailService,
    );

    // currency rate
    const { currencyRate, priceInUAH } = await OfferHelper.getConvertedPrice(
      this.currencyService,
      dto.currency,
      dto.price,
    );

    //check location
    await OfferHelper.validateLocation(dto.city, dto.region);

    // check bad-word filter

    const offer = await this.offerRepository.save(
      this.offerRepository.create({
        ...dto,
        brand: brand.brand,
        currencyRate,
        priceInUAH,
        user_id: userData.userId,
      }),
    );

    await OfferHelper.validateProfanity(
      `${dto.title} ${dto.description}`,
      offer,
      this.offerRepository,
    );
    return offer;
  }

  public async createOfferForShowroom(
    userData: IUserData,
    dto: OfferBaseReqDto,
  ): Promise<OfferEntity> {
    // check is user not banned
    const user = await OfferHelper.checkUserStatus(
      this.userRepository,
      userData.userId,
    );
    // check showroom
    const doUserHasShowroom = await this.userRepository.findOneBy({
      id: user.id,
      isHaveSalon: true,
    });
    if (!doUserHasShowroom) {
      throw new ConflictException('User has no showroom');
    }
    //got showroom
    const showroom = await this.carShowroomRepository.findOneBy({
      user_id: userData.userId,
    });

    // check brand
    const brand = await OfferHelper.validateBrand(
      this.carBrandRepository,
      dto.brand,
      this.mailService,
    );

    // currency rate
    const { currencyRate, priceInUAH } = await OfferHelper.getConvertedPrice(
      this.currencyService,
      dto.currency,
      dto.price,
    );

    await OfferHelper.validateLocation(dto.city, dto.region);

    // check bad-word filter

    const offer = await this.offerRepository.save(
      this.offerRepository.create({
        ...dto,
        currencyRate: currencyRate,
        priceInUAH: priceInUAH,
        user_id: userData.userId,
        isSalon: true,
        carShowroom_id: showroom.id,
        brand: brand.brand,
      }),
    );

    await OfferHelper.validateProfanity(
      `${dto.title} ${dto.description}`,
      offer,
      this.offerRepository,
    );
    return offer;
  }

  public async uploadCarImage(
    userData: IUserData,
    offerId: OfferID,
    file: Express.Multer.File,
  ): Promise<void> {
    const offer = await OfferHelper.checkAccessToOffer(
      this.offerRepository,
      offerId,
      userData,
    );

    const pathToFile = await this.fileStorageService.uploadFile(
      file,
      ContentType.IMAGE,
      offerId,
    );
    if (offer.image) {
      await this.fileStorageService.deleteFile(offer.image);
    }
    const awsConfig = this.configService.get<AwsConfig>('aws');
    const imageURL = `${awsConfig.endpoint}/${awsConfig.bucketName}/${pathToFile}`;
    await this.offerRepository.save({ ...offer, image: imageURL });
  }

  public async deleteCarImage(
    userData: IUserData,
    offerId: OfferID,
  ): Promise<void> {
    const offer = await OfferHelper.checkAccessToOffer(
      this.offerRepository,
      offerId,
      userData,
    );
    if (offer.image) {
      await this.fileStorageService.deleteFile(offer.image);
      await this.offerRepository.save({ ...offer, image: null });
    }
  }

  public async updateMyOffer(
    userData: IUserData,
    dto: UpdateOfferReqDto,
    offerId: OfferID,
  ): Promise<OfferEntity> {
    const offer = await OfferHelper.checkAccessToOffer(
      this.offerRepository,
      offerId,
      userData,
    );
    const currencyRate = await this.currencyService.getCurrency(dto.currency);
    const priceInUAH = await CurrencyConverterHelper.convertInUAH(
      dto.currency,
      dto.price,
      this.currencyService,
    );

    await OfferHelper.validateLocation(dto.city, dto.region);

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
    await OfferHelper.checkAccessToOffer(
      this.offerRepository,
      offerId,
      userData,
    );
    await this.offerRepository.delete({ id: offerId });
  }

  public async activateOfferUser(offerId: OfferID): Promise<void> {
    await OfferHelper.checkUserOfferForStatus(this.offerRepository, offerId);
    await this.offerRepository.update(
      { id: offerId },
      { status: StatusEnum.ACTIVE },
    );
  }

  public async deactivateOfferUser(offerId: OfferID): Promise<void> {
    await OfferHelper.checkUserOfferForStatus(this.offerRepository, offerId);
    await this.offerRepository.update(
      { id: offerId },
      { status: StatusEnum.INACTIVE },
    );
  }

  public async activateOfferShowroom(offerId: OfferID): Promise<void> {
    await OfferHelper.checkShowroomOfferForStatus(
      this.offerRepository,
      offerId,
    );
    await this.offerRepository.update(
      { id: offerId },
      { status: StatusEnum.ACTIVE },
    );
  }

  public async deactivateOfferShowroom(offerId: OfferID): Promise<void> {
    await OfferHelper.checkShowroomOfferForStatus(
      this.offerRepository,
      offerId,
    );
    await this.offerRepository.update(
      { id: offerId },
      { status: StatusEnum.INACTIVE },
    );
  }

  public async deleteByIdUserOffer(offerId: OfferID): Promise<void> {
    await OfferHelper.checkUserOfferForStatus(this.offerRepository, offerId);
    await this.offerRepository.delete({ id: offerId });
  }

  public async deleteByIdShowroomOffer(offerId: OfferID): Promise<void> {
    await OfferHelper.checkShowroomOfferForStatus(
      this.offerRepository,
      offerId,
    );
    await this.offerRepository.delete({ id: offerId });
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
