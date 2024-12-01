import { MechanicID } from '../../../../../common/types/entity-ids.type';
import { CarShowroomBaseResDto } from '../../../../carShowroom/models/dto/res/car-showroom-base.res.dto';
export declare class MechanicsBaseResDto {
    id: MechanicID;
    name: string;
    email: string;
    phone: string;
    experienceInYears?: number;
    carShowroom?: CarShowroomBaseResDto;
}
