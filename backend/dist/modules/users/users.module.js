"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const users_service_1 = require("./services/users.service");
const users_admin_service_1 = require("./services/users-admin.service");
const users_super_admin_service_1 = require("./services/users-super-admin.service");
const users_controller_1 = require("./users.controller");
const users_admin_controller_1 = require("./users-admin.controller");
const users_super_admin_controller_1 = require("./users-super-admin.controller");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        controllers: [
            users_controller_1.UsersController,
            users_admin_controller_1.UsersAdminController,
            users_super_admin_controller_1.UsersSuperAdminController,
        ],
        providers: [users_service_1.UsersService, users_admin_service_1.UsersAdminService, users_super_admin_service_1.UsersSuperAdminService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map