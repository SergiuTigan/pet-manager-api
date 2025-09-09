"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("./app.service");
const seeder_service_1 = require("./database/seeder.service");
const dto_1 = require("./common/dto");
let AppController = class AppController {
    constructor(appService, seederService) {
        this.appService = appService;
        this.seederService = seederService;
    }
    getWelcome() {
        return this.appService.getWelcome();
    }
    getHealth() {
        return this.appService.getHealth();
    }
    getStatistics() {
        return this.appService.getStatistics();
    }
    getVersion() {
        return this.appService.getVersion();
    }
    async seedDatabase() {
        try {
            await this.seederService.seedDatabase();
            return {
                success: true,
                message: 'Database seeded successfully with Romanian pet management data',
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Database seeding failed: ' + error.message,
                timestamp: new Date().toISOString(),
            };
        }
    }
    async clearDatabase() {
        try {
            await this.seederService.clearDatabase();
            return {
                success: true,
                message: 'Database cleared successfully',
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Database clearing failed: ' + error.message,
                timestamp: new Date().toISOString(),
            };
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get API welcome message' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Welcome message retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getWelcome", null);
__decorate([
    (0, common_1.Get)('health'),
    (0, swagger_1.ApiOperation)({
        summary: '🏥 API Health Check',
        description: 'Check if the API is running properly. Returns server status, memory usage, database connectivity, and system information.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '✅ API is healthy and running',
        type: dto_1.HealthResponseDto,
        schema: {
            properties: {
                success: { type: 'boolean', example: true },
                data: { $ref: '#/components/schemas/HealthResponseDto' },
                timestamp: { type: 'string', example: '2025-09-01T16:08:03.879Z' },
                path: { type: 'string', example: '/api/health' },
                message: { type: 'string', example: 'Health check completed successfully' }
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getHealth", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get comprehensive system statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'System statistics retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('version'),
    (0, swagger_1.ApiOperation)({ summary: 'Get API version information' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Version information retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getVersion", null);
__decorate([
    (0, common_1.Post)('seed-database'),
    (0, swagger_1.ApiOperation)({ summary: 'Seed database with mock data' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Database seeded successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "seedDatabase", null);
__decorate([
    (0, common_1.Post)('clear-database'),
    (0, swagger_1.ApiOperation)({ summary: 'Clear all database data' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Database cleared successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "clearDatabase", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiTags)('system'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        seeder_service_1.SeederService])
], AppController);
//# sourceMappingURL=app.controller.js.map