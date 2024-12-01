import { UserID } from '../../../common/types/entity-ids.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { AuthCacheService } from '../../auth/services/auth-cache-service';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { ListUserQueryDto } from '../models/dto/req/list-user-query.dto';
export declare class UsersAdminService {
    private readonly userRepository;
    private readonly authCacheService;
    private readonly refreshTokenRepository;
    constructor(userRepository: UserRepository, authCacheService: AuthCacheService, refreshTokenRepository: RefreshTokenRepository);
    findAll(query: ListUserQueryDto): Promise<[UserEntity[], number]>;
    findOne(userId: UserID): Promise<UserEntity>;
    ban(userId: UserID): Promise<void>;
    restoreUser(userId: UserID): Promise<void>;
}
