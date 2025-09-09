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
exports.VaccinationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vaccinations_service_1 = require("./vaccinations.service");
const interfaces_1 = require("../../common/interfaces");
let VaccinationsController = class VaccinationsController {
    constructor(vaccinationsService) {
        this.vaccinationsService = vaccinationsService;
    }
    async findAll(petId, vetId, status, type) {
        if (petId) {
            return this.vaccinationsService.findByPetId(parseInt(petId));
        }
        if (vetId) {
            return this.vaccinationsService.findByVetId(parseInt(vetId));
        }
        if (status) {
            return this.vaccinationsService.findByStatus(status);
        }
        if (type) {
            return this.vaccinationsService.findByType(type);
        }
        return this.vaccinationsService.findAll();
    }
    async getVaccinationsDueSoon(days) {
        const daysAhead = days ? parseInt(days) : 30;
        return this.vaccinationsService.getVaccinationsDueSoon(daysAhead);
    }
    async getExpiredVaccinations() {
        return this.vaccinationsService.findByStatus(interfaces_1.VaccinationStatus.EXPIRED);
    }
    async getStatistics() {
        return this.vaccinationsService.getStatistics();
    }
    async findOne(id) {
        const vaccination = await this.vaccinationsService.findOne(id);
        if (!vaccination) {
            throw new common_1.HttpException('Vaccination not found', common_1.HttpStatus.NOT_FOUND);
        }
        return vaccination;
    }
    async getCertificate(id) {
        const vaccination = await this.findOne(id);
        return this.vaccinationsService.getCertificate(id);
    }
    async create(createVaccinationDto) {
        return this.vaccinationsService.create(createVaccinationDto);
    }
    async update(id, updateVaccinationDto) {
        const existingVaccination = await this.findOne(id);
        return this.vaccinationsService.update(id, updateVaccinationDto);
    }
    async remove(id) {
        const existingVaccination = await this.findOne(id);
        await this.vaccinationsService.remove(id);
        return { message: 'Vaccination deleted successfully' };
    }
};
exports.VaccinationsController = VaccinationsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all vaccinations' }),
    (0, swagger_1.ApiQuery)({ name: 'petId', required: false, description: 'Filter by pet ID' }),
    (0, swagger_1.ApiQuery)({ name: 'vetId', required: false, description: 'Filter by veterinarian ID' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: interfaces_1.VaccinationStatus, description: 'Filter by status' }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: interfaces_1.VaccineType, description: 'Filter by vaccine type' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of vaccinations retrieved successfully' }),
    __param(0, (0, common_1.Query)('petId')),
    __param(1, (0, common_1.Query)('vetId')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], VaccinationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('due-soon'),
    (0, swagger_1.ApiOperation)({ summary: 'Get vaccinations due soon' }),
    (0, swagger_1.ApiQuery)({ name: 'days', required: false, description: 'Number of days ahead to check (default: 30)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vaccinations due soon retrieved successfully' }),
    __param(0, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VaccinationsController.prototype, "getVaccinationsDueSoon", null);
__decorate([
    (0, common_1.Get)('expired'),
    (0, swagger_1.ApiOperation)({ summary: 'Get expired vaccinations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Expired vaccinations retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VaccinationsController.prototype, "getExpiredVaccinations", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get vaccination statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vaccination statistics retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VaccinationsController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get vaccination by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Vaccination ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vaccination retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vaccination not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VaccinationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/certificate'),
    (0, swagger_1.ApiOperation)({ summary: 'Get vaccination certificate' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Vaccination ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vaccination certificate retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vaccination or certificate not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VaccinationsController.prototype, "getCertificate", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new vaccination record' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Vaccination created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VaccinationsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a vaccination record' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Vaccination ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vaccination updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vaccination not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], VaccinationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a vaccination record' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Vaccination ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vaccination deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vaccination not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VaccinationsController.prototype, "remove", null);
exports.VaccinationsController = VaccinationsController = __decorate([
    (0, swagger_1.ApiTags)('vaccinations'),
    (0, common_1.Controller)('vaccinations'),
    __metadata("design:paramtypes", [vaccinations_service_1.VaccinationsService])
], VaccinationsController);
//# sourceMappingURL=vaccinations.controller.js.map