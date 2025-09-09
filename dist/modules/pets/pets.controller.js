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
exports.PetsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pets_service_1 = require("./pets.service");
const dto_1 = require("../../common/dto");
const interfaces_1 = require("../../common/interfaces");
let PetsController = class PetsController {
    constructor(petsService) {
        this.petsService = petsService;
    }
    async findAll(ownerId, species, search) {
        if (search) {
            return this.petsService.searchPets(search);
        }
        if (ownerId) {
            return this.petsService.findByOwnerId(parseInt(ownerId));
        }
        if (species) {
            return this.petsService.findBySpecies(species);
        }
        return this.petsService.findAll();
    }
    async getStatistics() {
        return this.petsService.getStatistics();
    }
    async findOne(id) {
        const pet = await this.petsService.findOne(id);
        if (!pet) {
            throw new common_1.HttpException('Pet not found', common_1.HttpStatus.NOT_FOUND);
        }
        return pet;
    }
    async getPetVaccinations(id) {
        return this.petsService.getPetVaccinations(id);
    }
    async getPetConsultations(id) {
        return this.petsService.getPetConsultations(id);
    }
    async getPetDocuments(id) {
        return this.petsService.getPetDocuments(id);
    }
    async getPetFeedingSchedule(id) {
        return this.petsService.getPetFeedingSchedule(id);
    }
    async getPetHealthSummary(id) {
        const pet = await this.findOne(id);
        return this.petsService.getHealthSummary(id);
    }
    async create(createPetDto) {
        return this.petsService.create(createPetDto);
    }
    async update(id, updatePetDto) {
        const existingPet = await this.findOne(id);
        return this.petsService.update(id, updatePetDto);
    }
    async remove(id) {
        const existingPet = await this.findOne(id);
        await this.petsService.remove(id);
        return { message: 'Pet deleted successfully' };
    }
};
exports.PetsController = PetsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all pets' }),
    (0, swagger_1.ApiQuery)({ name: 'ownerId', required: false, description: 'Filter by owner ID' }),
    (0, swagger_1.ApiQuery)({ name: 'species', required: false, enum: interfaces_1.PetSpecies, description: 'Filter by species' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Search pets by name, breed, or microchip' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of pets retrieved successfully' }),
    __param(0, (0, common_1.Query)('ownerId')),
    __param(1, (0, common_1.Query)('species')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PetsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pet statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pet statistics retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PetsController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pet by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Pet ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pet retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pet not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PetsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/vaccinations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get vaccinations for a pet' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Pet ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pet vaccinations retrieved successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PetsController.prototype, "getPetVaccinations", null);
__decorate([
    (0, common_1.Get)(':id/consultations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get consultations for a pet' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Pet ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pet consultations retrieved successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PetsController.prototype, "getPetConsultations", null);
__decorate([
    (0, common_1.Get)(':id/documents'),
    (0, swagger_1.ApiOperation)({ summary: 'Get documents for a pet' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Pet ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pet documents retrieved successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PetsController.prototype, "getPetDocuments", null);
__decorate([
    (0, common_1.Get)(':id/feeding-schedule'),
    (0, swagger_1.ApiOperation)({ summary: 'Get feeding schedule for a pet' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Pet ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pet feeding schedule retrieved successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PetsController.prototype, "getPetFeedingSchedule", null);
__decorate([
    (0, common_1.Get)(':id/health-summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get comprehensive health summary for a pet' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Pet ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pet health summary retrieved successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PetsController.prototype, "getPetHealthSummary", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '🐾 Create a New Pet Profile',
        description: `
**Add a new pet to the system with comprehensive health information.**

Required fields:
- **name**: Pet's name
- **species**: Type of animal (Dog, Cat, Rabbit, Bird, Other)  
- **breed**: Specific breed information
- **gender**: Male or Female

Optional but recommended:
- **birth_date**: For age calculations and vaccination schedules
- **weight**: For medication dosing and health monitoring
- **microchip**: For identification and lost pet recovery
- **emergency_contact**: Important for veterinary emergencies

💡 **Tip**: Complete profiles help vets provide better care!
    `
    }),
    (0, swagger_1.ApiBody)({
        type: dto_1.CreatePetDto,
        examples: {
            dog: {
                summary: '🐕 Complete Dog Profile',
                description: 'Golden Retriever with full health information',
                value: {
                    name: 'Max',
                    species: 'Câine',
                    breed: 'Golden Retriever',
                    gender: 'Masculin',
                    birth_date: '2021-03-12',
                    weight: 32.5,
                    microchip: 'RO642123456789012',
                    color: 'Auriu',
                    photo_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
                    is_neutered: false,
                    medical_conditions: ['Displazia de șold ușoară'],
                    allergies: ['Pui'],
                    notes: 'Foarte prietenos cu copiii. Iubește să înoate.',
                    emergency_contact: {
                        name: 'Maria Popescu',
                        phone: '+40722123456',
                        relationship: 'Proprietară'
                    }
                }
            },
            cat: {
                summary: '🐱 Basic Cat Profile',
                description: 'Minimal required information for a cat',
                value: {
                    name: 'Luna',
                    species: 'Pisică',
                    breed: 'Pisică Persană',
                    gender: 'Feminin',
                    birth_date: '2022-07-08',
                    weight: 4.2,
                    color: 'Alb cu gri',
                    is_neutered: true
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '✅ Pet profile created successfully',
        schema: {
            properties: {
                success: { type: 'boolean', example: true },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'number', example: 7 },
                        name: { type: 'string', example: 'Max' },
                        species: { type: 'string', example: 'Câine' },
                        breed: { type: 'string', example: 'Golden Retriever' },
                        gender: { type: 'string', example: 'Masculin' },
                        birth_date: { type: 'string', example: '2021-03-12' },
                        weight: { type: 'number', example: 32.5 },
                        is_active: { type: 'boolean', example: true },
                        created_at: { type: 'string', example: '2025-09-01T16:15:00Z' }
                    }
                },
                timestamp: { type: 'string', example: '2025-09-01T16:15:00Z' },
                path: { type: 'string', example: '/api/pets' },
                message: { type: 'string', example: 'Pet created successfully' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '❌ Invalid input data - check required fields',
        schema: {
            properties: {
                success: { type: 'boolean', example: false },
                error: { type: 'string', example: 'Validation failed' },
                details: {
                    type: 'array',
                    items: { type: 'string' },
                    example: ['name should not be empty', 'species must be a valid enum value']
                },
                statusCode: { type: 'number', example: 400 },
                timestamp: { type: 'string', example: '2025-09-01T16:15:00Z' },
                path: { type: 'string', example: '/api/pets' }
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePetDto]),
    __metadata("design:returntype", Promise)
], PetsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a pet' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Pet ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pet updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pet not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UpdatePetDto]),
    __metadata("design:returntype", Promise)
], PetsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a pet' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Pet ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pet deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pet not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PetsController.prototype, "remove", null);
exports.PetsController = PetsController = __decorate([
    (0, swagger_1.ApiTags)('pets'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('pets'),
    __metadata("design:paramtypes", [pets_service_1.PetsService])
], PetsController);
//# sourceMappingURL=pets.controller.js.map