import { RoleEnum } from '../../../../common/enums/role.enum';
import { UserID } from '../../../../common/types/entity-ids.type';

export interface IUserData {
  userId: UserID;
  email: string;
  role: RoleEnum;
  permissions: string[];
}
