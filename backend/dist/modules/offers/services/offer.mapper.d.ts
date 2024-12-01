import { CarBrandEntity } from '../../../database/entities/car-brand.entity';
import { OfferEntity } from '../../../database/entities/offer.entity';
import { ListOfferQueryDto } from '../models/dto/req/list-offer-query.dto';
import { CarBrandResDto } from '../models/dto/res/car-brand.res.dto';
import { ListOfferResDto } from '../models/dto/res/list-offer.res.dto';
import { OfferBaseResDto } from '../models/dto/res/offer-base.res.dto';
export declare class OfferMapper {
    static toResDto(offer: OfferEntity): OfferBaseResDto;
    static toResDtoList(data: OfferEntity[], total: number, query: ListOfferQueryDto): ListOfferResDto;
    static toResDtoBrand(brand: CarBrandEntity): CarBrandResDto;
}
