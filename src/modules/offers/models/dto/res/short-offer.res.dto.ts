import { PickType } from '@nestjs/swagger';

import { OfferBaseResDto } from './offer-base.res.dto';

export class ShortOfferResDto extends PickType(OfferBaseResDto, [
  'id',
  'title',
  'brand',
  'model',
  'image',
  'priceInUAH',
]) {}
