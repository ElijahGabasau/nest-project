import { UserID } from '../../../common/types/entity-ids.type';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { AuthCacheService } from '../services/auth-cache-service';
import { TokenService } from '../services/token-service';
export declare class TokensHelper {
    static generateAndSaveTokens(tokenService: TokenService, authCacheService: AuthCacheService, refreshTokenRepository: RefreshTokenRepository, userId: UserID): Promise<import("../models/interfaces/token-pair.interface").ITokenPair>;
    static deleteTokens(authCacheService: AuthCacheService, refreshTokenRepository: RefreshTokenRepository, userId: UserID): Promise<void>;
}
