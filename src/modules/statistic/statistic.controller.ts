import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { StatisticService } from './services/statistic.service';

// @ApiBearerAuth()
@ApiTags('statistic')
@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get(':offerId')
  public async get() {
    return await this.statisticService.get();
  }
}
