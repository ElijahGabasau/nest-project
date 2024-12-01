import { RoleEnum } from '../../common/enums/role.enum';
import { CarShowroomID, MechanicID, UserID } from '../../common/types/entity-ids.type';
import { CarShowroomEntity } from './car-showroom.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';
export declare class MechanicEntity extends CreateUpdateModel {
    id: MechanicID;
    name: string;
    email: string;
    phone: string;
    experienceInYears: number;
    role: RoleEnum;
    user_id: UserID;
    user?: UserEntity;
    carShowroom_id: CarShowroomID;
    carShowroom?: CarShowroomEntity;
}
