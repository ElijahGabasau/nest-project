import { ApiProperty } from '@nestjs/swagger';

import { RoleEnum } from '../../../../../common/enums/role.enum';
import { UserID } from '../../../../../common/types/entity-ids.type';
import { AccountEnum } from '../../enums/account.enum';

export class UserBaseResDto {
  @ApiProperty({ type: String })
  id: UserID;
  name: string;
  email: string;
  phone?: string;
  account: AccountEnum;
  role: RoleEnum;
  isActive: boolean;
}
