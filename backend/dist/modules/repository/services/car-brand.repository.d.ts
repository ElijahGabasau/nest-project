import { DataSource, Repository } from 'typeorm';
import { CarBrandEntity } from '../../../database/entities/car-brand.entity';
export declare class CarBrandRepository extends Repository<CarBrandEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
}
