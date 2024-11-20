import { PickType } from '@nestjs/swagger';

import { UserBaseReqDto } from './user-base.req.dto';

export class UpdateUserAccountReqDto extends PickType(UserBaseReqDto, [
  'account',
]) {}
