"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensHelper = void 0;
class TokensHelper {
    static async generateAndSaveTokens(tokenService, authCacheService, refreshTokenRepository, userId) {
        const tokens = await tokenService.generateAuthTokens({
            userId,
        });
        await Promise.all([
            authCacheService.saveToken(tokens.accessToken, userId),
            refreshTokenRepository.save(refreshTokenRepository.create({
                user_id: userId,
                refreshToken: tokens.refreshToken,
            })),
        ]);
        return tokens;
    }
    static async deleteTokens(authCacheService, refreshTokenRepository, userId) {
        await Promise.all([
            authCacheService.deleteToken(userId),
            refreshTokenRepository.delete({ user_id: userId }),
        ]);
    }
}
exports.TokensHelper = TokensHelper;
//# sourceMappingURL=tokens.helper.js.map