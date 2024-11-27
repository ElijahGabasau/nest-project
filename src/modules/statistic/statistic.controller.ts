import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { OfferID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { StatisticBaseResDto } from './models/dto/res/statistic-base.res.dto';
import { StatisticMapper } from './services/statistic.mapper';
import { StatisticService } from './services/statistic.service';

@ApiBearerAuth()
@ApiTags('statistic')
@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get(':offerId')
  public async getStatistic(
    @CurrentUser() userData: IUserData,
    @Param('offerId') offerId: OfferID,
  ): Promise<StatisticBaseResDto> {
    const result = await this.statisticService.getStatistic(userData, offerId);
    return StatisticMapper.toResDto(result);
  }
}
