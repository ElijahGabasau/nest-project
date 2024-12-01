"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissions = void 0;
const role_enum_1 = require("../../common/enums/role.enum");
const permission_enum_1 = require("./enums/permission.enum");
exports.RolePermissions = {
    [role_enum_1.RoleEnum.ADMIN]: [
        permission_enum_1.PermissionEnum.DELETE_USER_OFFER,
        permission_enum_1.PermissionEnum.ACTIVATE_OFFER_USER,
        permission_enum_1.PermissionEnum.DEACTIVATE_OFFER_USER,
    ],
    [role_enum_1.RoleEnum.SHOWROOM_ADMIN]: [
        permission_enum_1.PermissionEnum.DELETE_SHOWROOM_OFFER,
        permission_enum_1.PermissionEnum.ACTIVATE_OFFER_SHOWROOM,
        permission_enum_1.PermissionEnum.DEACTIVATE_OFFER_SHOWROOM,
    ],
    [role_enum_1.RoleEnum.SUPER_ADMIN]: [
        permission_enum_1.PermissionEnum.DELETE_USER_OFFER,
        permission_enum_1.PermissionEnum.CREATE_ADMIN,
        permission_enum_1.PermissionEnum.DELETE_BY_ID_SUPER_ADMIN,
        permission_enum_1.PermissionEnum.ACTIVATE_OFFER_USER,
        permission_enum_1.PermissionEnum.DEACTIVATE_OFFER_USER,
    ],
    [role_enum_1.RoleEnum.SHOWROOM_SUPER_ADMIN]: [
        permission_enum_1.PermissionEnum.DELETE_SHOWROOM_OFFER,
        permission_enum_1.PermissionEnum.CREATE_SHOWROOM_ADMIN,
        permission_enum_1.PermissionEnum.DELETE_BY_ID_SHOWROOM_SUPER_ADMIN,
        permission_enum_1.PermissionEnum.ACTIVATE_OFFER_SHOWROOM,
        permission_enum_1.PermissionEnum.DEACTIVATE_OFFER_SHOWROOM,
    ],
};
//# sourceMappingURL=role-permissions.js.map