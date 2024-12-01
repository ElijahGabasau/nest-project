import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { AuthCacheService } from '../../auth/services/auth-cache-service';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';
export declare class UsersService {
    private readonly userRepository;
    private readonly refreshTokenRepository;
    private readonly authCacheService;
    constructor(userRepository: UserRepository, refreshTokenRepository: RefreshTokenRepository, authCacheService: AuthCacheService);
    becomeSeller(userData: IUserData): Promise<UserEntity>;
    me(userData: IUserData): Promise<UserEntity>;
    updateMe(userData: IUserData, dto: UpdateUserReqDto): Promise<UserEntity>;
    deleteMe(userData: IUserData): Promise<void>;
    updateAccount(userData: IUserData): Promise<UserEntity>;
}
