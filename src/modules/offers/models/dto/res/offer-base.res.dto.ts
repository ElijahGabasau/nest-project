import { ApiProperty } from '@nestjs/swagger';

import { OfferID } from '../../../../../common/types/entity-ids.type';
import { CurrencyEnum } from '../../enums/currency.enum';

export class OfferBaseResDto {
  @ApiProperty({ type: String })
  id: OfferID;
  title: string;
  description: string;
  brand: string;
  model: string;
  year?: number;

  priceInUAH: number;

  price: number;
  currency: CurrencyEnum;
  currencyRate: number;

  city: string;
  region: string;
  image?: string;
}
