import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RoleEnum } from '../../common/enums/role.enum';
import { OfferID } from '../../common/types/entity-ids.type';
import { Roles } from '../accessControl/decorators/roles.decorator';
import { RolesGuard } from '../accessControl/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { StatisticBaseResDto } from './models/dto/res/statistic-base.res.dto';
import { StatisticMapper } from './services/statistic.mapper';
import { StatisticService } from './services/statistic.service';

@ApiBearerAuth()
@ApiTags('statistic')
@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(
    RoleEnum.USER,
    RoleEnum.ADMIN,
    RoleEnum.SUPER_ADMIN,
    RoleEnum.SHOWROOM_ADMIN,
    RoleEnum.SHOWROOM_SUPER_ADMIN,
  )
  @Get(':offerId')
  @ApiOperation({ summary: 'Get offer statistic' })
  public async getStatistic(
    @CurrentUser() userData: IUserData,
    @Param('offerId') offerId: OfferID,
  ): Promise<StatisticBaseResDto> {
    const result = await this.statisticService.getStatistic(userData, offerId);
    return StatisticMapper.toResDto(result);
  }
}
