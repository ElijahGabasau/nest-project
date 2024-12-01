import { RoleEnum } from '../../common/enums/role.enum';
import { UserID } from '../../common/types/entity-ids.type';
import { PermissionEnum } from '../../modules/accessControl/enums/permission.enum';
import { AccountEnum } from '../../modules/users/models/enums/account.enum';
import { CarShowroomEntity } from './car-showroom.entity';
import { MechanicEntity } from './mechanic.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { OfferEntity } from './offer.entity';
import { RefreshTokenEntity } from './refresh-token.entity';
export declare class UserEntity extends CreateUpdateModel {
    id: UserID;
    name: string;
    email: string;
    password: string;
    phone?: string;
    account: AccountEnum;
    role: RoleEnum;
    isHaveSalon: boolean;
    isActive: boolean;
    permissions: PermissionEnum[];
    refreshTokens?: RefreshTokenEntity[];
    offers?: OfferEntity[];
    carShowroom?: CarShowroomEntity;
    mechanics?: MechanicEntity[];
}
