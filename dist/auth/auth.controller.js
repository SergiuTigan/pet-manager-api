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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const dto_1 = require("../common/dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.authService.login(user);
    }
    async demoLogin(demoDto) {
        try {
            return await this.authService.loginDemo(demoDto.userType);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async logout() {
        return {
            message: 'Logged out successfully. Remove token from client storage.',
            timestamp: new Date().toISOString(),
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: 'Login with email and password',
        description: 'Authenticate user with email and password. Returns JWT token for API access.'
    }),
    (0, swagger_1.ApiBody)({
        type: dto_1.LoginDto,
        examples: {
            owner: {
                summary: 'Pet Owner Login',
                value: {
                    email: 'maria.popescu@email.com',
                    password: 'password123'
                }
            },
            veterinarian: {
                summary: 'Veterinarian Login',
                value: {
                    email: 'dr.radu.ionescu@vetclinic.ro',
                    password: 'password123'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User logged in successfully',
        type: dto_1.ApiResponseDto,
        schema: {
            properties: {
                success: { type: 'boolean', example: true },
                data: { $ref: '#/components/schemas/LoginResponseDto' },
                timestamp: { type: 'string', example: '2025-09-01T16:08:14.906Z' },
                path: { type: 'string', example: '/api/auth/login' },
                message: { type: 'string', example: 'User logged in successfully' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Invalid credentials',
        schema: {
            properties: {
                success: { type: 'boolean', example: false },
                error: { type: 'string', example: 'Invalid credentials' },
                statusCode: { type: 'number', example: 401 },
                timestamp: { type: 'string', example: '2025-09-01T16:08:14.906Z' },
                path: { type: 'string', example: '/api/auth/login' }
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('demo-login'),
    (0, swagger_1.ApiOperation)({
        summary: '🚀 Quick Demo Login (No Password Required)',
        description: `
**Perfect for testing!** Get instant access without creating accounts.

Choose between:
- **Owner**: Pet owner with access to their pets' health records
- **Veterinarian**: Vet with access to patient management and medical records

⚡ **Pro tip**: Use this endpoint first to get a JWT token, then click "Authorize" above to test protected endpoints!
    `
    }),
    (0, swagger_1.ApiBody)({
        type: dto_1.DemoLoginDto,
        examples: {
            owner: {
                summary: '👤 Login as Pet Owner',
                description: 'Get access as Maria Popescu (pet owner)',
                value: { userType: 'owner' }
            },
            veterinarian: {
                summary: '👩‍⚕️ Login as Veterinarian',
                description: 'Get access as Dr. Radu Ionescu (veterinarian)',
                value: { userType: 'veterinarian' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Demo user logged in successfully - Ready to test!',
        type: dto_1.ApiResponseDto,
        schema: {
            properties: {
                success: { type: 'boolean', example: true },
                data: { $ref: '#/components/schemas/LoginResponseDto' },
                timestamp: { type: 'string', example: '2025-09-01T16:08:14.906Z' },
                path: { type: 'string', example: '/api/auth/demo-login' },
                message: { type: 'string', example: 'Demo login successful - Token ready for API testing!' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid user type - must be "owner" or "veterinarian"',
        schema: {
            properties: {
                success: { type: 'boolean', example: false },
                error: { type: 'string', example: 'Invalid user type. Must be "owner" or "veterinarian".' },
                statusCode: { type: 'number', example: 400 },
                timestamp: { type: 'string', example: '2025-09-01T16:08:14.906Z' },
                path: { type: 'string', example: '/api/auth/demo-login' }
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DemoLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "demoLogin", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiOperation)({ summary: 'Logout user (client-side token removal)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User logged out successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map