import { UserEntity } from '../../../database/entities/user.entity';
import { IJwtPayload } from '../../auth/models/interfaces/jwt-payload.interface';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { ListUserQueryDto } from '../models/dto/req/list-user-query.dto';
import { ListUserResDto } from '../models/dto/res/list-user.res.dto';
import { UserAdminResDto } from '../models/dto/res/user-admin.res.dto';
import { UserBaseResDto } from '../models/dto/res/user-base.res.dto';
export declare class UserMapper {
    static toResDto(user: UserEntity): UserBaseResDto;
    static toResDtoList(data: UserEntity[], total: number, query: ListUserQueryDto): ListUserResDto;
    static toIUserData(user: UserEntity, jwtPayload: IJwtPayload): IUserData;
    static toAdminResDto(user: UserEntity): UserAdminResDto;
}
