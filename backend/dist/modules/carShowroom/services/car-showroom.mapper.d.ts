import { CarShowroomEntity } from '../../../database/entities/car-showroom.entity';
import { ListCarShowroomQueryDto } from '../models/dto/req/list-car-showroom-query.dto';
import { CarShowroomBaseResDto } from '../models/dto/res/car-showroom-base.res.dto';
import { ListCarShowroomResDto } from '../models/dto/res/list-car-showroom.res.dto';
export declare class CarShowroomMapper {
    static toResDto(carShowroom: CarShowroomEntity): CarShowroomBaseResDto;
    static toResDtoList(data: CarShowroomEntity[], total: number, query: ListCarShowroomQueryDto): ListCarShowroomResDto;
}
