import { PickType } from '@nestjs/swagger';

import { MechanicsBaseReqDto } from './mechanics-base.req.dto';

export class MechanicsUpdateReqDto extends PickType(MechanicsBaseReqDto, [
  'phone',
  'experienceInYears',
]) {}
