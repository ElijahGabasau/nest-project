import { CarShowroomID, UserID } from '../../common/types/entity-ids.type';
import { MechanicEntity } from './mechanic.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { OfferEntity } from './offer.entity';
import { UserEntity } from './user.entity';
export declare class CarShowroomEntity extends CreateUpdateModel {
    id: CarShowroomID;
    name: string;
    description: string;
    email: string;
    phone?: string;
    user_id: UserID;
    user?: UserEntity;
    mechanics?: MechanicEntity[];
    offers?: OfferEntity[];
}
