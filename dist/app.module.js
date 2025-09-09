"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const common_2 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const core_2 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const database_config_1 = require("./config/database.config");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const pets_module_1 = require("./modules/pets/pets.module");
const vaccinations_module_1 = require("./modules/vaccinations/vaccinations.module");
const consultations_module_1 = require("./modules/consultations/consultations.module");
const documents_module_1 = require("./modules/documents/documents.module");
const feeding_schedules_module_1 = require("./modules/feeding-schedules/feeding-schedules.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const entities_1 = require("./entities");
const seeder_service_1 = require("./database/seeder.service");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(database_config_1.databaseConfig),
            typeorm_1.TypeOrmModule.forFeature([entities_1.User, entities_1.Pet, entities_1.Vaccination, entities_1.Consultation, entities_1.Document, entities_1.FeedingSchedule, entities_1.Notification]),
            throttler_1.ThrottlerModule.forRoot([
                {
                    name: 'short',
                    ttl: 1000,
                    limit: 10,
                },
                {
                    name: 'medium',
                    ttl: 10000,
                    limit: 20,
                },
                {
                    name: 'long',
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            pets_module_1.PetsModule,
            vaccinations_module_1.VaccinationsModule,
            consultations_module_1.ConsultationsModule,
            documents_module_1.DocumentsModule,
            feeding_schedules_module_1.FeedingSchedulesModule,
            notifications_module_1.NotificationsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            seeder_service_1.SeederService,
            {
                provide: core_1.APP_PIPE,
                useValue: new common_2.ValidationPipe({
                    whitelist: true,
                    forbidNonWhitelisted: true,
                    transform: true,
                    transformOptions: {
                        enableImplicitConversion: true,
                    },
                    exceptionFactory: (errors) => {
                        const messages = errors.map(error => {
                            const constraints = error.constraints;
                            return constraints ? Object.values(constraints).join(', ') : error.property;
                        });
                        return new (require('@nestjs/common').BadRequestException)(messages);
                    },
                }),
            },
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LoggingInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: transform_interceptor_1.TransformInterceptor,
            },
            {
                provide: core_2.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map