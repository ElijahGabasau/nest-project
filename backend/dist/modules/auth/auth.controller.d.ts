import { SignInReqDto } from './models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from './models/dto/req/sign-up.req.dto';
import { AuthResDto } from './models/dto/res/auth.res.dto';
import { TokenPairResDto } from './models/dto/res/token-pair.res.dto';
import { IUserData } from './models/interfaces/user-data.interface';
import { AuthService } from './services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(dto: SignUpReqDto): Promise<AuthResDto>;
    signIn(dto: SignInReqDto): Promise<AuthResDto>;
    signOut(userData: IUserData): Promise<void>;
    refresh(userData: IUserData): Promise<TokenPairResDto>;
}
