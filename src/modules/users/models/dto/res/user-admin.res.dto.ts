import { PickType } from '@nestjs/swagger';

import { UserBaseResDto } from './user-base.res.dto';

export class UserAdminResDto extends PickType(UserBaseResDto, [
  'name',
  'id',
  'role',
]) {}
