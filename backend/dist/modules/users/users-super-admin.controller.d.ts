import { RoleEnum } from '../../common/enums/role.enum';
import { UserID } from '../../common/types/entity-ids.type';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { UserAdminBaseReqDto } from './models/dto/req/user-admin-base.req.dto';
import { UserAdminResDto } from './models/dto/res/user-admin.res.dto';
import { UserBaseResDto } from './models/dto/res/user-base.res.dto';
import { UsersSuperAdminService } from './services/users-super-admin.service';
export declare class UsersSuperAdminController {
    private readonly usersSuperAdminService;
    constructor(usersSuperAdminService: UsersSuperAdminService);
    createSuperAdmin(dto: UserAdminBaseReqDto): Promise<UserAdminResDto>;
    createSuperAdminShowroom(dto: UserAdminBaseReqDto): Promise<UserAdminResDto>;
    createAdmin(userData: IUserData, dto: UserAdminBaseReqDto): Promise<UserAdminResDto>;
    createAdminShowroom(userData: IUserData, dto: UserAdminBaseReqDto): Promise<UserAdminResDto>;
    deleteOne(userId: UserID): Promise<void>;
    deleteOneS(userId: UserID): Promise<void>;
    findByRole(role: RoleEnum): Promise<UserBaseResDto[]>;
}
