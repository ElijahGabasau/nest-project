import { DataSource, Repository } from 'typeorm';
import { CarShowroomEntity } from '../../../database/entities/car-showroom.entity';
import { ListCarShowroomQueryDto } from '../../carShowroom/models/dto/req/list-car-showroom-query.dto';
export declare class CarShowroomRepository extends Repository<CarShowroomEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    findAll(query: ListCarShowroomQueryDto): Promise<[CarShowroomEntity[], number]>;
}
