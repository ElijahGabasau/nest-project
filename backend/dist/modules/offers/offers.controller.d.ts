import { OfferID } from '../../common/types/entity-ids.type';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { CarBrandReqDto } from './models/dto/req/car-brand.req.dto';
import { ListOfferQueryDto } from './models/dto/req/list-offer-query.dto';
import { OfferBaseReqDto } from './models/dto/req/offer-base.req.dto';
import { UpdateOfferReqDto } from './models/dto/req/update-offer.req.dto';
import { CarBrandResDto } from './models/dto/res/car-brand.res.dto';
import { ListOfferResDto } from './models/dto/res/list-offer.res.dto';
import { OfferBaseResDto } from './models/dto/res/offer-base.res.dto';
import { OffersService } from './services/offers.service';
export declare class OffersController {
    private readonly offersService;
    constructor(offersService: OffersService);
    findAll(query: ListOfferQueryDto): Promise<ListOfferResDto>;
    createOffer(userData: IUserData, dto: OfferBaseReqDto): Promise<OfferBaseResDto>;
    createOfferForShowroom(userData: IUserData, dto: OfferBaseReqDto): Promise<OfferBaseResDto>;
    uploadCarImage(userData: IUserData, offerId: OfferID, file: Express.Multer.File): Promise<OfferBaseResDto>;
    delereCarImage(userData: IUserData, offerId: OfferID): Promise<void>;
    updateMyOffer(userData: IUserData, dto: UpdateOfferReqDto, offerId: OfferID): Promise<OfferBaseResDto>;
    get(offerId: OfferID): Promise<OfferBaseResDto>;
    deleteMyOffer(userData: IUserData, offerId: OfferID): Promise<void>;
    activateOfferUser(offerId: OfferID): Promise<void>;
    deactivateOfferUser(offerId: OfferID): Promise<void>;
    activateOfferShowroom(offerId: OfferID): Promise<void>;
    deactivateOfferShowroom(offerId: OfferID): Promise<void>;
    deleteByIdUserOffer(offerId: OfferID): Promise<void>;
    deleteByIdShowroomOffer(offerId: OfferID): Promise<void>;
    addCarBrand(dto: CarBrandReqDto): Promise<CarBrandResDto>;
}
