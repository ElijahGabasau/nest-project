import { ListMechanicQueryDto } from '../req/list-mechanic-query.dto';
import { MechanicsBaseResDto } from './mechanics-base.res.dto';

export class ListMechanicsResDto extends ListMechanicQueryDto {
  data: MechanicsBaseResDto[];
  total: number;
}
