import { UserID } from '../../common/types/entity-ids.type';
import { ListUserQueryDto } from './models/dto/req/list-user-query.dto';
import { ListUserResDto } from './models/dto/res/list-user.res.dto';
import { UserBaseResDto } from './models/dto/res/user-base.res.dto';
import { UsersAdminService } from './services/users-admin.service';
export declare class UsersAdminController {
    private readonly usersAdminService;
    constructor(usersAdminService: UsersAdminService);
    findAll(query: ListUserQueryDto): Promise<ListUserResDto>;
    findOne(userId: UserID): Promise<UserBaseResDto>;
    ban(userId: UserID): Promise<void>;
    restoreUser(userId: UserID): Promise<void>;
}
