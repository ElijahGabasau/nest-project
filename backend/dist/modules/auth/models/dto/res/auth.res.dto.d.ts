import { UserBaseResDto } from '../../../../users/models/dto/res/user-base.res.dto';
import { TokenPairResDto } from './token-pair.res.dto';
export declare class AuthResDto {
    tokens: TokenPairResDto;
    user: UserBaseResDto;
}
