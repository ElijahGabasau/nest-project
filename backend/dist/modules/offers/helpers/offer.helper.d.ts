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
import { CurrencyService } from '../services/currency.service';
export declare class OfferHelper {
    static checkAccessToOffer(offerRepository: OfferRepository, offerId: OfferID, userData: IUserData): Promise<OfferEntity>;
    static checkUserStatus(userRepository: UserRepository, userId: UserID): Promise<UserEntity>;
    static validateLocation(city: string, region: string): Promise<void>;
    static validateBrand(carBrandRepository: CarBrandRepository, brandName: string, mailService: MailService): Promise<CarBrandEntity>;
    static getConvertedPrice(currencyService: CurrencyService, currency: CurrencyEnum, price: number): Promise<{
        currencyRate: number;
        priceInUAH: number;
    }>;
    static validateProfanity(text: string, offer: OfferEntity, offerRepository: OfferRepository): Promise<void>;
    static checkUserOfferForStatus(offerRepository: OfferRepository, offerId: OfferID): Promise<void>;
    static checkShowroomOfferForStatus(offerRepository: OfferRepository, offerId: OfferID): Promise<void>;
}
