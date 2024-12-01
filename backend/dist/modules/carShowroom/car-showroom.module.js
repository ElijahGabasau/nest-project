"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarShowroomModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const car_showroom_controller_1 = require("./car-showroom.controller");
const car_showroom_service_1 = require("./services/car-showroom.service");
let CarShowroomModule = class CarShowroomModule {
};
exports.CarShowroomModule = CarShowroomModule;
exports.CarShowroomModule = CarShowroomModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        controllers: [car_showroom_controller_1.CarShowroomController],
        providers: [car_showroom_service_1.CarShowroomService],
    })
], CarShowroomModule);
//# sourceMappingURL=car-showroom.module.js.map