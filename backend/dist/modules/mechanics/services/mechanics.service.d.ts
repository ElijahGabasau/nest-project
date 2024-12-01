import { MechanicID } from '../../../common/types/entity-ids.type';
import { MechanicEntity } from '../../../database/entities/mechanic.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { CarShowroomRepository } from '../../repository/services/car-showroom.repository';
import { MechanicRepository } from '../../repository/services/mechanic.repository';
import { ListMechanicQueryDto } from '../models/dto/req/list-mechanic-query.dto';
import { MechanicsBaseReqDto } from '../models/dto/req/mechanics-base.req.dto';
import { MechanicsUpdateReqDto } from '../models/dto/req/mechanics-update.req.dto';
export declare class MechanicsService {
    private readonly mechanicRepository;
    private readonly carShowroomRepository;
    constructor(mechanicRepository: MechanicRepository, carShowroomRepository: CarShowroomRepository);
    create(userData: IUserData, dto: MechanicsBaseReqDto): Promise<MechanicEntity>;
    update(userData: IUserData, dto: MechanicsUpdateReqDto, mechanicId: MechanicID): Promise<MechanicEntity>;
    getAll(query: ListMechanicQueryDto): Promise<[MechanicEntity[], number]>;
    getMyMechanic(userData: IUserData, mechanicId: MechanicID): Promise<MechanicEntity>;
    getById(mechanicId: MechanicID): Promise<MechanicEntity>;
    deleteMyMechanic(userData: IUserData, mechanicId: MechanicID): Promise<void>;
    deleteById(mechanicId: MechanicID): Promise<void>;
    private isEmailExist;
}
