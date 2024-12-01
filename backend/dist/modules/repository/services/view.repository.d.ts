import { DataSource, Repository } from 'typeorm';
import { ViewEntity } from '../../../database/entities/view.entity';
export declare class ViewRepository extends Repository<ViewEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
}
