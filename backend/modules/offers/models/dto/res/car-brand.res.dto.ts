import { ApiProperty } from '@nestjs/swagger';

import { CarBrandID } from '../../../../../common/types/entity-ids.type';

export class CarBrandResDto {
  @ApiProperty({ type: String })
  id: CarBrandID;
  brand: string;
}
