import { RoleEnum } from '../../../common/enums/role.enum';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: RoleEnum[]) => import("@nestjs/common").CustomDecorator<string>;
