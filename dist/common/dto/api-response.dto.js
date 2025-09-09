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
exports.HealthResponseDto = exports.LoginResponseDto = exports.ApiResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ApiResponseDto {
}
exports.ApiResponseDto = ApiResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indicates if the request was successful', example: true }),
    __metadata("design:type", Boolean)
], ApiResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Response data' }),
    __metadata("design:type", Object)
], ApiResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Response timestamp', example: '2025-09-01T16:08:03.879Z' }),
    __metadata("design:type", String)
], ApiResponseDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'API endpoint path', example: '/api/pets' }),
    __metadata("design:type", String)
], ApiResponseDto.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Response message', example: 'Operation completed successfully' }),
    __metadata("design:type", String)
], ApiResponseDto.prototype, "message", void 0);
class LoginResponseDto {
}
exports.LoginResponseDto = LoginResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'JWT access token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User information',
        example: {
            id: 1,
            email: 'maria.popescu@email.com',
            name: 'Maria Popescu',
            type: 'owner',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b123?w=150'
        }
    }),
    __metadata("design:type", Object)
], LoginResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Token expiration time', example: '24h' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "expires_in", void 0);
class HealthResponseDto {
}
exports.HealthResponseDto = HealthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Health status', example: 'healthy' }),
    __metadata("design:type", String)
], HealthResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Server timestamp', example: '2025-09-01T16:08:03.879Z' }),
    __metadata("design:type", String)
], HealthResponseDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Environment', example: 'development' }),
    __metadata("design:type", String)
], HealthResponseDto.prototype, "environment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'API version', example: '1.0.0' }),
    __metadata("design:type", String)
], HealthResponseDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Server uptime in seconds', example: 17.64989575 }),
    __metadata("design:type", Number)
], HealthResponseDto.prototype, "uptime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Memory usage information',
        example: { used: 37, total: 40, unit: 'MB' }
    }),
    __metadata("design:type", Object)
], HealthResponseDto.prototype, "memory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'System information',
        example: {
            platform: 'darwin',
            arch: 'arm64',
            node_version: 'v20.19.0'
        }
    }),
    __metadata("design:type", Object)
], HealthResponseDto.prototype, "system", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Database connection status',
        example: {
            status: 'connected',
            type: 'mock_json',
            location: '../mock-data/'
        }
    }),
    __metadata("design:type", Object)
], HealthResponseDto.prototype, "database", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Response time', example: '0.00ms' }),
    __metadata("design:type", String)
], HealthResponseDto.prototype, "response_time", void 0);
//# sourceMappingURL=api-response.dto.js.map