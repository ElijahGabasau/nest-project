import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { SignInReqDto } from '../models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../models/dto/req/sign-up.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { TokenPairResDto } from '../models/dto/res/token-pair.res.dto';
import { IUserData } from '../models/interfaces/user-data.interface';
import { AuthCacheService } from './auth-cache-service';
import { TokenService } from './token-service';
export declare class AuthService {
    private readonly userRepository;
    private readonly authCacheService;
    private readonly refreshTokenRepository;
    private readonly tokenService;
    constructor(userRepository: UserRepository, authCacheService: AuthCacheService, refreshTokenRepository: RefreshTokenRepository, tokenService: TokenService);
    signUp(dto: SignUpReqDto): Promise<AuthResDto>;
    signIn(dto: SignInReqDto): Promise<AuthResDto>;
    signOut(userData: IUserData): Promise<void>;
    refresh(userData: IUserData): Promise<TokenPairResDto>;
    private isEmailExist;
    private isUserNotDeleted;
}
