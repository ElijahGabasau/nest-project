import { CarShowroomID } from '../../../common/types/entity-ids.type';
import { CarShowroomEntity } from '../../../database/entities/car-showroom.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { CarShowroomRepository } from '../../repository/services/car-showroom.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { CarShowroomBaseReqDto } from '../models/dto/req/car-showroom-base.req.dto';
import { CarShowroomUpdateReqDto } from '../models/dto/req/car-showroom-update.req.dto';
import { ListCarShowroomQueryDto } from '../models/dto/req/list-car-showroom-query.dto';
export declare class CarShowroomService {
    private readonly carShowroomRepository;
    private readonly userRepository;
    constructor(carShowroomRepository: CarShowroomRepository, userRepository: UserRepository);
    create(userData: IUserData, dto: CarShowroomBaseReqDto): Promise<CarShowroomEntity>;
    updateMyShowroom(userData: IUserData, dto: CarShowroomUpdateReqDto): Promise<CarShowroomEntity>;
    deleteMyShowroom(userData: IUserData): Promise<void>;
    getMyShowroom(userData: IUserData): Promise<CarShowroomEntity>;
    findAll(query: ListCarShowroomQueryDto): Promise<[CarShowroomEntity[], number]>;
    getShowroom(showroomId: CarShowroomID): Promise<CarShowroomEntity>;
    deleteShowroom(showroomId: CarShowroomID): Promise<void>;
}
