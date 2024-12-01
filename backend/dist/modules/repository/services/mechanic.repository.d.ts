import { DataSource, Repository } from 'typeorm';
import { MechanicEntity } from '../../../database/entities/mechanic.entity';
import { ListMechanicQueryDto } from '../../mechanics/models/dto/req/list-mechanic-query.dto';
export declare class MechanicRepository extends Repository<MechanicEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    findAllBy(query: ListMechanicQueryDto): Promise<[MechanicEntity[], number]>;
}
