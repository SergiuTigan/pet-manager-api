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
exports.ConsultationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const consultations_service_1 = require("./consultations.service");
const interfaces_1 = require("../../common/interfaces");
let ConsultationsController = class ConsultationsController {
    constructor(consultationsService) {
        this.consultationsService = consultationsService;
    }
    async findAll(petId, vetId, status, type) {
        if (petId) {
            return this.consultationsService.findByPetId(parseInt(petId));
        }
        if (vetId) {
            return this.consultationsService.findByVetId(parseInt(vetId));
        }
        if (status) {
            return this.consultationsService.findByStatus(status);
        }
        if (type) {
            return this.consultationsService.findByType(type);
        }
        return this.consultationsService.findAll();
    }
    getUpcomingConsultations(days) {
        const daysAhead = days ? parseInt(days) : 7;
        return this.consultationsService.getUpcomingConsultations(daysAhead);
    }
    getStatistics() {
        return this.consultationsService.getStatistics();
    }
    async findOne(id) {
        const consultation = await this.consultationsService.findOne(id);
        if (!consultation) {
            throw new common_1.HttpException('Consultation not found', common_1.HttpStatus.NOT_FOUND);
        }
        return consultation;
    }
    async create(createConsultationDto) {
        return this.consultationsService.create(createConsultationDto);
    }
    async update(id, updateConsultationDto) {
        const existingConsultation = await this.findOne(id);
        return this.consultationsService.update(id, updateConsultationDto);
    }
    async remove(id) {
        const existingConsultation = await this.findOne(id);
        return this.consultationsService.remove(id);
    }
    async updateStatus(id, status) {
        return this.consultationsService.updateStatus(id, status);
    }
};
exports.ConsultationsController = ConsultationsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all consultations' }),
    (0, swagger_1.ApiQuery)({ name: 'petId', required: false, description: 'Filter by pet ID' }),
    (0, swagger_1.ApiQuery)({ name: 'vetId', required: false, description: 'Filter by veterinarian ID' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: interfaces_1.ConsultationStatus, description: 'Filter by status' }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: interfaces_1.ConsultationType, description: 'Filter by consultation type' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of consultations retrieved successfully' }),
    __param(0, (0, common_1.Query)('petId')),
    __param(1, (0, common_1.Query)('vetId')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ConsultationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('upcoming'),
    (0, swagger_1.ApiOperation)({ summary: 'Get upcoming consultations' }),
    (0, swagger_1.ApiQuery)({ name: 'days', required: false, description: 'Number of days ahead to check (default: 7)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Upcoming consultations retrieved successfully' }),
    __param(0, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "getUpcomingConsultations", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get consultation statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Consultation statistics retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get consultation by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Consultation ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Consultation retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Consultation not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ConsultationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new consultation' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Consultation created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConsultationsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a consultation' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Consultation ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Consultation updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Consultation not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ConsultationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a consultation' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Consultation ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Consultation deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Consultation not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ConsultationsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update consultation status' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Consultation ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Consultation status updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], ConsultationsController.prototype, "updateStatus", null);
exports.ConsultationsController = ConsultationsController = __decorate([
    (0, swagger_1.ApiTags)('consultations'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('consultations'),
    __metadata("design:paramtypes", [consultations_service_1.ConsultationsService])
], ConsultationsController);
//# sourceMappingURL=consultations.controller.js.map