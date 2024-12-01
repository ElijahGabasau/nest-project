import { RoleEnum } from '../../../../../common/enums/role.enum';
import { AccountEnum } from '../../enums/account.enum';
export declare class UserBaseReqDto {
    name: string;
    email: string;
    password: string;
    phone?: string;
    account: AccountEnum;
    role: RoleEnum;
    isHaveSalon: boolean;
}
