import { PartialType, PickType } from '@nestjs/swagger';

import { OfferBaseReqDto } from './offer-base.req.dto';

export class UpdateOfferReqDto extends PartialType(
  PickType(OfferBaseReqDto, [
    'title',
    'currency',
    'price',
    'description',
    'image',
    'city',
    'region',
  ]),
) {}
