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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const interfaces_1 = require("../../common/interfaces");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAll(type, search) {
        if (search) {
            return this.usersService.searchUsers(search);
        }
        if (type) {
            return this.usersService.findByType(type);
        }
        return this.usersService.findAll();
    }
    async getOwners() {
        return this.usersService.findByType(interfaces_1.UserType.OWNER);
    }
    async getVeterinarians() {
        return this.usersService.findByType(interfaces_1.UserType.VETERINARIAN);
    }
    async getStatistics() {
        return this.usersService.getStatistics();
    }
    async findOne(id) {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async getUserPets(id) {
        const user = await this.findOne(id);
        return this.usersService.getUserPets(id);
    }
    async getUserNotifications(id, unread) {
        const user = await this.findOne(id);
        if (unread === 'true') {
            return this.usersService.getUnreadNotifications(id);
        }
        return this.usersService.getUserNotifications(id);
    }
    async getDashboardData(id) {
        const user = await this.findOne(id);
        return this.usersService.getDashboardData(id);
    }
    async getVetConsultations(id, status) {
        const user = await this.findOne(id);
        if (user.type !== interfaces_1.UserType.VETERINARIAN) {
            throw new common_1.HttpException('User is not a veterinarian', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.usersService.getVetConsultations(id, status);
    }
    async getVetVaccinations(id) {
        const user = await this.findOne(id);
        if (user.type !== interfaces_1.UserType.VETERINARIAN) {
            throw new common_1.HttpException('User is not a veterinarian', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.usersService.getVetVaccinations(id);
    }
    async create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async update(id, updateUserDto) {
        const existingUser = await this.findOne(id);
        return this.usersService.update(id, updateUserDto);
    }
    async remove(id) {
        const existingUser = await this.findOne(id);
        await this.usersService.remove(id);
        return { message: 'User deleted successfully' };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: interfaces_1.UserType, description: 'Filter by user type' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Search users by name or email' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of users retrieved successfully' }),
    __param(0, (0, common_1.Query)('type')),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('owners'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all pet owners' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of pet owners retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getOwners", null);
__decorate([
    (0, common_1.Get)('veterinarians'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all veterinarians' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of veterinarians retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getVeterinarians", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User statistics retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/pets'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pets owned by user' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User pets retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserPets", null);
__decorate([
    (0, common_1.Get)(':id/notifications'),
    (0, swagger_1.ApiOperation)({ summary: 'Get notifications for user' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID' }),
    (0, swagger_1.ApiQuery)({ name: 'unread', required: false, description: 'Filter unread notifications' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User notifications retrieved successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('unread')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserNotifications", null);
__decorate([
    (0, common_1.Get)(':id/dashboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Get dashboard data for user' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dashboard data retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getDashboardData", null);
__decorate([
    (0, common_1.Get)(':id/consultations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get consultations for veterinarian' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Veterinarian ID' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, description: 'Filter by consultation status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Veterinarian consultations retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Veterinarian not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getVetConsultations", null);
__decorate([
    (0, common_1.Get)(':id/vaccinations-administered'),
    (0, swagger_1.ApiOperation)({ summary: 'Get vaccinations administered by veterinarian' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Veterinarian ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vaccinations administered retrieved successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getVetVaccinations", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a user' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map