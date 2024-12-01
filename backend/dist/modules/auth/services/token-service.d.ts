import { ConfigService } from '@nestjs/config/dist/config.service';
import { JwtService } from '@nestjs/jwt';
import { Config } from '../../../configs/config.type';
import { TokenType } from '../models/enums/token-type.enum';
import { IJwtPayload } from '../models/interfaces/jwt-payload.interface';
import { ITokenPair } from '../models/interfaces/token-pair.interface';
export declare class TokenService {
    private readonly jwtService;
    private readonly configService;
    private readonly jwtConfig;
    constructor(jwtService: JwtService, configService: ConfigService<Config>);
    generateAuthTokens(payload: IJwtPayload): Promise<ITokenPair>;
    verifyToken(token: string, type: TokenType): Promise<IJwtPayload>;
    private getSecret;
}
