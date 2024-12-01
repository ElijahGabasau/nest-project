import { RoleEnum } from '../../common/enums/role.enum';
import { PermissionEnum } from './enums/permission.enum';

export const RolePermissions = {
  [RoleEnum.ADMIN]: [
    PermissionEnum.DELETE_USER_OFFER,
    PermissionEnum.ACTIVATE_OFFER_USER,
    PermissionEnum.DEACTIVATE_OFFER_USER,
  ],
  [RoleEnum.SHOWROOM_ADMIN]: [
    PermissionEnum.DELETE_SHOWROOM_OFFER,
    PermissionEnum.ACTIVATE_OFFER_SHOWROOM,
    PermissionEnum.DEACTIVATE_OFFER_SHOWROOM,
  ],
  [RoleEnum.SUPER_ADMIN]: [
    PermissionEnum.DELETE_USER_OFFER,
    PermissionEnum.CREATE_ADMIN,
    PermissionEnum.DELETE_BY_ID_SUPER_ADMIN,
    PermissionEnum.ACTIVATE_OFFER_USER,
    PermissionEnum.DEACTIVATE_OFFER_USER,
  ],
  [RoleEnum.SHOWROOM_SUPER_ADMIN]: [
    PermissionEnum.DELETE_SHOWROOM_OFFER,
    PermissionEnum.CREATE_SHOWROOM_ADMIN,
    PermissionEnum.DELETE_BY_ID_SHOWROOM_SUPER_ADMIN,
    PermissionEnum.ACTIVATE_OFFER_SHOWROOM,
    PermissionEnum.DEACTIVATE_OFFER_SHOWROOM,
  ],
};
