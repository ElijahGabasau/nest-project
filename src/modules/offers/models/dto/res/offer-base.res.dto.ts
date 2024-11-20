import { ApiProperty } from '@nestjs/swagger';

import { OfferID } from '../../../../../common/types/entity-ids.type';
import { BrandEnum } from '../../enums/brand.enum';
import { CurrencyEnum } from '../../enums/currency.enum';

export class OfferBaseResDto {
  @ApiProperty({ type: String })
  id: OfferID;
  title: string;
  description: string;
  brand: BrandEnum;
  model: string;
  year?: number;
  price: number;
  currency: CurrencyEnum;
  city: string;
  region: string;
  image?: string;
}
