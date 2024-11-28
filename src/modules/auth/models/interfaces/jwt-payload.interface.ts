import { RoleEnum } from '../../../../common/enums/role.enum';
import { UserID } from '../../../../common/types/entity-ids.type';

export interface IJwtPayload {
  userId: UserID;
  // role: RoleEnum;
}
