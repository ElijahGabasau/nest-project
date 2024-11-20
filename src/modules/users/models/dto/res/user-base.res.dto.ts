import { ApiProperty } from '@nestjs/swagger';

import { UserID } from '../../../../../common/types/entity-ids.type';
import { RoleEnum } from '../../enums/role.enum';
import { StatusEnum } from '../../enums/status.enum';

export class UserBaseResDto {
  @ApiProperty({ type: String })
  id: UserID;
  name: string;
  email: string;
  phone: string;
  status: StatusEnum;
  role: RoleEnum;
}
