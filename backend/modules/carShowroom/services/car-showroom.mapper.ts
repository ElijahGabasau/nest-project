import { CarShowroomEntity } from '../../../database/entities/car-showroom.entity';
import { ListCarShowroomQueryDto } from '../models/dto/req/list-car-showroom-query.dto';
import { CarShowroomBaseResDto } from '../models/dto/res/car-showroom-base.res.dto';
import { ListCarShowroomResDto } from '../models/dto/res/list-car-showroom.res.dto';

export class CarShowroomMapper {
  public static toResDto(
    carShowroom: CarShowroomEntity,
  ): CarShowroomBaseResDto {
    return {
      id: carShowroom.id,
      name: carShowroom.name,
      description: carShowroom.description,
      email: carShowroom.email,
      phone: carShowroom.phone,
    };
  }
  public static toResDtoList(
    data: CarShowroomEntity[],
    total: number,
    query: ListCarShowroomQueryDto,
  ): ListCarShowroomResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
