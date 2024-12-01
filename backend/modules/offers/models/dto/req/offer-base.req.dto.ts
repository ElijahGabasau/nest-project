import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { CurrencyEnum } from '../../enums/currency.enum';

export class OfferBaseReqDto {
  @IsString()
  @Length(1, 50)
  @Transform(TransformHelper.trim)
  title: string;

  @IsString()
  @Length(1, 200)
  description: string;

  @IsString()
  brand: string;

  @IsString()
  @Length(1, 50)
  model: string;

  @IsOptional()
  @IsNumber()
  @Min(1950)
  @Max(2024)
  year?: number;

  @IsNumber()
  price: number;

  @IsEnum(CurrencyEnum)
  currency: CurrencyEnum;

  @ApiProperty({ default: null })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ default: null })
  @IsString()
  @IsOptional()
  region?: string;
}
