import { PickType } from '@nestjs/swagger';

import { CarShowroomBaseReqDto } from './car-showroom-base.req.dto';

export class CarShowroomUpdateReqDto extends PickType(CarShowroomBaseReqDto, [
  'phone',
  'description',
]) {}
