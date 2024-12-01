import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { UserBaseResDto } from './models/dto/res/user-base.res.dto';
import { UsersService } from './services/users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    becomeSeller(userData: IUserData): Promise<UserBaseResDto>;
    me(userData: IUserData): Promise<UserBaseResDto>;
    updateMe(userData: IUserData, dto: UpdateUserReqDto): Promise<UserBaseResDto>;
    deleteMe(userData: IUserData): Promise<void>;
    updateAccount(userData: IUserData): Promise<UserBaseResDto>;
}
