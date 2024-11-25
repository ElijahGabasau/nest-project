import { CarBrandEntity } from '../../../database/entities/car-brand.entity';
import { OfferEntity } from '../../../database/entities/offer.entity';
import { ListOfferQueryDto } from '../models/dto/req/list-offer-query.dto';
import { CarBrandResDto } from '../models/dto/res/car-brand.res.dto';
import { ListOfferResDto } from '../models/dto/res/list-offer.res.dto';
import { OfferBaseResDto } from '../models/dto/res/offer-base.res.dto';

export class OfferMapper {
  public static toResDto(offer: OfferEntity): OfferBaseResDto {
    return {
      id: offer.id,
      title: offer.title,
      description: offer.description,
      brand: offer.brand,
      model: offer.model,
      year: offer.year,
      priceInUAH: offer.priceInUAH,
      price: offer.price,
      currency: offer.currency,
      currencyRate: offer.currencyRate,
      city: offer.city,
      region: offer.region,
      image: offer.image,
    };
  }

  public static toResDtoList(
    data: OfferEntity[],
    total: number,
    query: ListOfferQueryDto,
  ): ListOfferResDto {
    return {
      data: data.map((offer) => this.toResDto(offer)),
      total,
      ...query,
    };
  }
  public static toResDtoBrand(brand: CarBrandEntity): CarBrandResDto {
    return {
      id: brand.id,
      brand: brand.brand,
    };
  }
}
