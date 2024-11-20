import { ApiProperty } from '@nestjs/swagger';

import { MechanicID } from '../../../../../common/types/entity-ids.type';

export class MechanicsBaseResDto {
  @ApiProperty({ type: String })
  id: MechanicID;
  name: string;
  email: string;
  phone: string;
  experience: number;
}
