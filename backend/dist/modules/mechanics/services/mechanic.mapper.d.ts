import { MechanicEntity } from '../../../database/entities/mechanic.entity';
import { ListMechanicQueryDto } from '../models/dto/req/list-mechanic-query.dto';
import { ListMechanicsResDto } from '../models/dto/res/list-mechanics.res.dto';
import { MechanicsBaseResDto } from '../models/dto/res/mechanics-base.res.dto';
export declare class MechanicMapper {
    static toResDto(mechanic: MechanicEntity): MechanicsBaseResDto;
    static toResDtoList(data: MechanicEntity[], total: number, query: ListMechanicQueryDto): ListMechanicsResDto;
}
