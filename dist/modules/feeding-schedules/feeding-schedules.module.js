"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedingSchedulesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const feeding_schedules_service_1 = require("./feeding-schedules.service");
const feeding_schedules_controller_1 = require("./feeding-schedules.controller");
const feeding_schedule_entity_1 = require("../../entities/feeding-schedule.entity");
let FeedingSchedulesModule = class FeedingSchedulesModule {
};
exports.FeedingSchedulesModule = FeedingSchedulesModule;
exports.FeedingSchedulesModule = FeedingSchedulesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([feeding_schedule_entity_1.FeedingSchedule])],
        controllers: [feeding_schedules_controller_1.FeedingSchedulesController],
        providers: [feeding_schedules_service_1.FeedingSchedulesService],
        exports: [feeding_schedules_service_1.FeedingSchedulesService],
    })
], FeedingSchedulesModule);
//# sourceMappingURL=feeding-schedules.module.js.map