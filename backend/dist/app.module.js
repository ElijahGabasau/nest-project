"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const schedule_1 = require("@nestjs/schedule");
const global_exception_filter_1 = require("./common/filters/global-exception.filter");
const configuration_1 = __importDefault(require("./configs/configuration"));
const auth_module_1 = require("./modules/auth/auth.module");
const car_showroom_module_1 = require("./modules/carShowroom/car-showroom.module");
const logger_module_1 = require("./modules/logger/logger.module");
const mechanics_module_1 = require("./modules/mechanics/mechanics.module");
const offers_module_1 = require("./modules/offers/offers.module");
const postgres_module_1 = require("./modules/postgres/postgres.module");
const redis_module_1 = require("./modules/redis/redis.module");
const repository_module_1 = require("./modules/repository/repository.module");
const statistic_module_1 = require("./modules/statistic/statistic.module");
const tasks_module_1 = require("./modules/tasks/tasks.module");
const users_module_1 = require("./modules/users/users.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                isGlobal: true,
            }),
            schedule_1.ScheduleModule.forRoot(),
            tasks_module_1.TasksModule,
            logger_module_1.LoggerModule,
            redis_module_1.RedisModule,
            postgres_module_1.PostgresModule,
            repository_module_1.RepositoryModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            offers_module_1.OffersModule,
            car_showroom_module_1.CarShowroomModule,
            mechanics_module_1.MechanicsModule,
            statistic_module_1.StatisticModule,
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: global_exception_filter_1.GlobalExceptionFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map