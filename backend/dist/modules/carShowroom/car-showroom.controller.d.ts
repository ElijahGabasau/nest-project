import { CarShowroomID } from '../../common/types/entity-ids.type';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { CarShowroomBaseReqDto } from './models/dto/req/car-showroom-base.req.dto';
import { CarShowroomUpdateReqDto } from './models/dto/req/car-showroom-update.req.dto';
import { ListCarShowroomQueryDto } from './models/dto/req/list-car-showroom-query.dto';
import { CarShowroomBaseResDto } from './models/dto/res/car-showroom-base.res.dto';
import { ListCarShowroomResDto } from './models/dto/res/list-car-showroom.res.dto';
import { CarShowroomService } from './services/car-showroom.service';
export declare class CarShowroomController {
    private readonly carShowroomService;
    constructor(carShowroomService: CarShowroomService);
    create(userData: IUserData, dto: CarShowroomBaseReqDto): Promise<CarShowroomBaseResDto>;
    updateMyShowroom(userData: IUserData, dto: CarShowroomUpdateReqDto): Promise<CarShowroomBaseResDto>;
    deleteMyShowroom(userData: IUserData): Promise<void>;
    getMyShowroom(userData: IUserData): Promise<CarShowroomBaseResDto>;
    findAll(query: ListCarShowroomQueryDto): Promise<ListCarShowroomResDto>;
    getShowroom(showroomId: CarShowroomID): Promise<CarShowroomBaseResDto>;
    deleteShowroom(showroomId: CarShowroomID): Promise<void>;
}
