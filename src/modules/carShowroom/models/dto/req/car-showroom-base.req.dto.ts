import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

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

  @IsString()
  @Length(10, 300)
  @Transform(TransformHelper.trim)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
  email: string;

  @IsOptional()
  @ApiProperty({ example: '+380501234567' })
  @IsString()
  @Length(10, 15)
  @Matches(/^\+380\d{9}$/)
  phone?: string;
}
