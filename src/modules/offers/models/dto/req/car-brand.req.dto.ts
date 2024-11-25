import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CarBrandReqDto {
  @ApiProperty({ example: 'BMW' })
  @IsString()
  brand: string;
}
