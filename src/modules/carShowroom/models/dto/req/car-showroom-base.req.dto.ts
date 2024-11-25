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
  @Length(5, 300)
  description: string;

  @ApiProperty({ example: 'mysalon@test.com' })
  @IsString()
  @Length(10, 300)
  @Transform(TransformHelper.trim)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;

  @IsOptional()
  @ApiProperty({ example: '+380501234567' })
  @IsString()
  @Length(10, 15)
  @Matches(/^\+380\d{9}$/)
  phone?: string;
}
