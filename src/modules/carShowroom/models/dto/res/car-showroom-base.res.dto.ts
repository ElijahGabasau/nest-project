import { ApiProperty } from '@nestjs/swagger';

import { ShowRoomID } from '../../../../../common/types/entity-ids.type';

export class CarShowroomBaseResDto {
  @ApiProperty({ type: String })
  id: ShowRoomID;
  name: string;
  description: string;
}
