import { ApiProperty } from '@nestjs/swagger';

import { RoleEnum } from '../../../../../common/enums/role.enum';
import { MechanicID } from '../../../../../common/types/entity-ids.type';

export class MechanicsBaseResDto {
  @ApiProperty({ type: String })
  id: MechanicID;
  name: string;
  email: string;
  phone: string;
  experienceInYears?: number;
  role: RoleEnum;
}
