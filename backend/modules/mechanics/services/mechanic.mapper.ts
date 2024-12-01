import { CarShowroomEntity } from '../../../database/entities/car-showroom.entity';
import { MechanicEntity } from '../../../database/entities/mechanic.entity';
import { ListCarShowroomQueryDto } from '../../carShowroom/models/dto/req/list-car-showroom-query.dto';
import { ListCarShowroomResDto } from '../../carShowroom/models/dto/res/list-car-showroom.res.dto';
import { CarShowroomMapper } from '../../carShowroom/services/car-showroom.mapper';
import { ListMechanicQueryDto } from '../models/dto/req/list-mechanic-query.dto';
import { ListMechanicsResDto } from '../models/dto/res/list-mechanics.res.dto';
import { MechanicsBaseResDto } from '../models/dto/res/mechanics-base.res.dto';

export class MechanicMapper {
  public static toResDto(mechanic: MechanicEntity): MechanicsBaseResDto {
    return {
      id: mechanic.id,
      name: mechanic.name,
      email: mechanic.email,
      phone: mechanic.phone,
      experienceInYears: mechanic.experienceInYears,
      carShowroom: mechanic.carShowroom
        ? CarShowroomMapper.toResDto(mechanic.carShowroom)
        : null,
    };
  }
  public static toResDtoList(
    data: MechanicEntity[],
    total: number,
    query: ListMechanicQueryDto,
  ): ListMechanicsResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
