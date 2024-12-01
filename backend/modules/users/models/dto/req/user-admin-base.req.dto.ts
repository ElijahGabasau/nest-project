import { PickType } from '@nestjs/swagger';

import { UserBaseReqDto } from './user-base.req.dto';

export class UserAdminBaseReqDto extends PickType(UserBaseReqDto, [
  'name',
  'email',
  'password',
]) {}
