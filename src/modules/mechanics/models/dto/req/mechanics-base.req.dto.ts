import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class MechanicsBaseReqDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @Length(2, 50)
  @Transform(TransformHelper.trim)
  name: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsString()
  @IsEmail()
  @Length(10, 150)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  @Transform(TransformHelper.trim)
  email: string;

  @ApiProperty({ example: '+380501234567' })
  @IsString()
  @Length(10, 15)
  @Matches(/^\+380\d{9}$/)
  phone: string;

  @IsOptional()
  @IsNumber()
  experience: number;
}
