import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { BrandEnum } from '../../enums/brand.enum';
import { CurrencyEnum } from '../../enums/currency.enum';

export class OfferBaseReqDto {
  @IsString()
  @Length(1, 10)
  @Transform(TransformHelper.trim)
  title: string;

  @IsString()
  @Length(1, 200)
  description: string;

  @IsEnum(BrandEnum)
  brand: BrandEnum;

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

  @IsString()
  city: string;

  @IsString()
  region: string;

  @IsOptional()
  @IsString()
  @Length(0, 3000)
  image?: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  isSalon: boolean;
}
