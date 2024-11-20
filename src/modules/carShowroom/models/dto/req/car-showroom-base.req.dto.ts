import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class CarShowroomBaseReqDto {
  @ApiProperty({ example: 'My salon' })
  @IsString()
  @Length(2, 50)
  @Transform(TransformHelper.trim)
  name: string;

  @IsString()
  @Length(10, 300)
  description: string;
}
