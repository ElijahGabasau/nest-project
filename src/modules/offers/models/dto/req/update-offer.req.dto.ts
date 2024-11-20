import { PickType } from '@nestjs/swagger';

import { OfferBaseReqDto } from './offer-base.req.dto';

export class UpdateOfferReqDto extends PickType(OfferBaseReqDto, [
  'city',
  'currency',
  'price',
  'description',
  'image',
  'city',
  'region',
]) {}
