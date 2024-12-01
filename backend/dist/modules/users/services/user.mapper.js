"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const role_enum_1 = require("../../../common/enums/role.enum");
class UserMapper {
    static toResDto(user) {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            account: user.account,
            role: user.role,
            isActive: user.isActive,
        };
    }
    static toResDtoList(data, total, query) {
        return {
            data: data.map((user) => this.toResDto(user)),
            total,
            ...query,
        };
    }
    static toIUserData(user, jwtPayload) {
        return {
            userId: user.id,
            email: user.email,
            role: user.role || role_enum_1.RoleEnum.USER,
            permissions: user.permissions,
        };
    }
    static toAdminResDto(user) {
        return {
            id: user.id,
            name: user.name,
            role: user.role,
        };
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=user.mapper.js.map