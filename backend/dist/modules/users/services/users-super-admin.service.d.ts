import { RoleEnum } from '../../../common/enums/role.enum';
import { UserID } from '../../../common/types/entity-ids.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { AuthCacheService } from '../../auth/services/auth-cache-service';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserAdminBaseReqDto } from '../models/dto/req/user-admin-base.req.dto';
export declare class UsersSuperAdminService {
    private readonly userRepository;
    private readonly authCacheService;
    private readonly refreshTokenRepository;
    constructor(userRepository: UserRepository, authCacheService: AuthCacheService, refreshTokenRepository: RefreshTokenRepository);
    createSuperAdmin(dto: UserAdminBaseReqDto): Promise<UserEntity>;
    createSuperAdminShowroom(dto: UserAdminBaseReqDto): Promise<UserEntity>;
    createAdmin(dto: UserAdminBaseReqDto): Promise<UserEntity>;
    createAdminShowroom(dto: UserAdminBaseReqDto): Promise<UserEntity>;
    deleteOne(userId: UserID): Promise<void>;
    deleteOneS(userId: UserID): Promise<void>;
    findByRole(role: RoleEnum): Promise<UserEntity[]>;
    private isEmailExist;
}
