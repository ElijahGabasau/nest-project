import { PickType } from '@nestjs/swagger';

import { OfferBaseResDto } from './offer-base.res.dto';

export class ShortOfferResDto extends PickType(OfferBaseResDto, [
  'title',
  'brand',
  'model',
  'image',

  //todo price in uah
  'price',
  'currency',
]) {}
