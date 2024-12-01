import { UserBaseResDto } from '../../../../users/models/dto/res/user-base.res.dto';
import { TokenPairResDto } from './token-pair.res.dto';

export class AuthResDto {
  tokens: TokenPairResDto;
  user: UserBaseResDto;
}
