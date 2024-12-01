import { ListMechanicQueryDto } from '../req/list-mechanic-query.dto';
import { MechanicsBaseResDto } from './mechanics-base.res.dto';
export declare class ListMechanicsResDto extends ListMechanicQueryDto {
    data: MechanicsBaseResDto[];
    total: number;
}
