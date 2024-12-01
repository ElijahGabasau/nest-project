import { RefreshTokenID, UserID } from '../../common/types/entity-ids.type';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';
export declare class RefreshTokenEntity extends CreateUpdateModel {
    id: RefreshTokenID;
    refreshToken: string;
    user_id: UserID;
    user?: UserEntity;
}
