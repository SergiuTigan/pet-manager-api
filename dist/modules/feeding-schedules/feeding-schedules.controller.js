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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedingSchedulesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const feeding_schedules_service_1 = require("./feeding-schedules.service");
const interfaces_1 = require("../../common/interfaces");
let FeedingSchedulesController = class FeedingSchedulesController {
    constructor(feedingSchedulesService) {
        this.feedingSchedulesService = feedingSchedulesService;
    }
    async findAll(petId, foodType) {
        if (petId) {
            return this.feedingSchedulesService.findByPetId(parseInt(petId));
        }
        if (foodType) {
            return this.feedingSchedulesService.findByFoodType(foodType);
        }
        return this.feedingSchedulesService.findAll();
    }
    getStatistics() {
        return this.feedingSchedulesService.getStatistics();
    }
    async findOne(id) {
        const schedule = await this.feedingSchedulesService.findOne(id);
        if (!schedule) {
            throw new common_1.HttpException('Feeding schedule not found', common_1.HttpStatus.NOT_FOUND);
        }
        return schedule;
    }
    async create(createScheduleDto) {
        return this.feedingSchedulesService.create(createScheduleDto);
    }
    async update(id, updateScheduleDto) {
        const existingSchedule = await this.findOne(id);
        return this.feedingSchedulesService.update(id, updateScheduleDto);
    }
    async remove(id) {
        const existingSchedule = await this.findOne(id);
        return this.feedingSchedulesService.remove(id);
    }
    async addFeedingNote(id, feedingNoteDto) {
        return this.feedingSchedulesService.addFeedingNote(id, feedingNoteDto);
    }
    async getRecommendations(id) {
        return this.feedingSchedulesService.getRecommendations(id);
    }
};
exports.FeedingSchedulesController = FeedingSchedulesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all feeding schedules' }),
    (0, swagger_1.ApiQuery)({ name: 'petId', required: false, description: 'Filter by pet ID' }),
    (0, swagger_1.ApiQuery)({ name: 'foodType', required: false, enum: interfaces_1.FoodType, description: 'Filter by food type' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of feeding schedules retrieved successfully' }),
    __param(0, (0, common_1.Query)('petId')),
    __param(1, (0, common_1.Query)('foodType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FeedingSchedulesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get feeding schedule statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Feeding schedule statistics retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FeedingSchedulesController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get feeding schedule by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Feeding schedule ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Feeding schedule retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Feeding schedule not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FeedingSchedulesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new feeding schedule' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Feeding schedule created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FeedingSchedulesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a feeding schedule' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Feeding schedule ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Feeding schedule updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Feeding schedule not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FeedingSchedulesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a feeding schedule' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Feeding schedule ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Feeding schedule deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Feeding schedule not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FeedingSchedulesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/feeding-note'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a feeding note' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Feeding schedule ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Feeding note added successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FeedingSchedulesController.prototype, "addFeedingNote", null);
__decorate([
    (0, common_1.Get)(':id/recommendations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get feeding recommendations for a schedule' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Feeding schedule ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Feeding recommendations retrieved successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FeedingSchedulesController.prototype, "getRecommendations", null);
exports.FeedingSchedulesController = FeedingSchedulesController = __decorate([
    (0, swagger_1.ApiTags)('feeding-schedules'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('feeding-schedules'),
    __metadata("design:paramtypes", [feeding_schedules_service_1.FeedingSchedulesService])
], FeedingSchedulesController);
//# sourceMappingURL=feeding-schedules.controller.js.map