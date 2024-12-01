import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../../../database/entities/user.entity';
import { ListUserQueryDto } from '../../users/models/dto/req/list-user-query.dto';
export declare class UserRepository extends Repository<UserEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    findAll(query: ListUserQueryDto): Promise<[UserEntity[], number]>;
}
