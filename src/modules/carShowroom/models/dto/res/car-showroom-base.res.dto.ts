import { ApiProperty } from '@nestjs/swagger';

import { CarShowroomID } from '../../../../../common/types/entity-ids.type';

export class CarShowroomBaseResDto {
  @ApiProperty({ type: String })
  id: CarShowroomID;
  name: string;
  description: string;
  email: string;
  phone?: string;
}
