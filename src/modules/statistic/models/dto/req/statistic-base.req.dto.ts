import { IsNumber, Min } from 'class-validator';

export class StatisticBaseReqDto {
  @IsNumber()
  @Min(0)
  views: number;

  @IsNumber()
  @Min(0)
  viewsPerDay: number;

  @IsNumber()
  @Min(0)
  viewsPerWeek: number;

  @IsNumber()
  @Min(0)
  viewsPerMonth: number;

  @IsNumber()
  @Min(0)
  averagePriceByRegionInUAH: number;

  @IsNumber()
  @Min(0)
  averagePriceByUkraineInUAH: number;
}
