import { MechanicID } from '../../common/types/entity-ids.type';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { ListMechanicQueryDto } from './models/dto/req/list-mechanic-query.dto';
import { MechanicsBaseReqDto } from './models/dto/req/mechanics-base.req.dto';
import { MechanicsUpdateReqDto } from './models/dto/req/mechanics-update.req.dto';
import { ListMechanicsResDto } from './models/dto/res/list-mechanics.res.dto';
import { MechanicsBaseResDto } from './models/dto/res/mechanics-base.res.dto';
import { MechanicsService } from './services/mechanics.service';
export declare class MechanicsController {
    private readonly mechanicsService;
    constructor(mechanicsService: MechanicsService);
    create(userData: IUserData, dto: MechanicsBaseReqDto): Promise<MechanicsBaseResDto>;
    update(userData: IUserData, dto: MechanicsUpdateReqDto, mechanicId: MechanicID): Promise<MechanicsBaseResDto>;
    getAll(query: ListMechanicQueryDto): Promise<ListMechanicsResDto>;
    getMyMechanic(userData: IUserData, mechanicId: MechanicID): Promise<MechanicsBaseResDto>;
    getById(mechanicId: MechanicID): Promise<MechanicsBaseResDto>;
    deleteMyMechanic(userData: IUserData, mechanicId: MechanicID): Promise<void>;
    deleteById(mechanicId: MechanicID): Promise<void>;
}
