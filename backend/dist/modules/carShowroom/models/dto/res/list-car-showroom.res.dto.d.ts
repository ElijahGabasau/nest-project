import { ListCarShowroomQueryDto } from '../req/list-car-showroom-query.dto';
import { CarShowroomBaseResDto } from './car-showroom-base.res.dto';
export declare class ListCarShowroomResDto extends ListCarShowroomQueryDto {
    data: CarShowroomBaseResDto[];
    total: number;
}
