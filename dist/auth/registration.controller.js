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
exports.RegistrationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const registration_service_1 = require("./registration.service");
const register_dto_1 = require("./dto/register.dto");
const interfaces_1 = require("../common/interfaces");
let RegistrationController = class RegistrationController {
    constructor(registrationService) {
        this.registrationService = registrationService;
    }
    async registerOwner(registerDto) {
        const userData = {
            ...registerDto,
            type: interfaces_1.UserType.OWNER,
        };
        return this.registrationService.register(userData);
    }
    async registerVeterinarian(registerDto) {
        if (!registerDto.clinic_name || !registerDto.clinic_address || !registerDto.license_number) {
            throw new common_1.BadRequestException([
                'Veterinarians must provide clinic_name, clinic_address, and license_number'
            ]);
        }
        const userData = {
            ...registerDto,
            type: interfaces_1.UserType.VETERINARIAN,
        };
        return this.registrationService.register(userData);
    }
    async checkEmailAvailability(email) {
        const isAvailable = await this.registrationService.isEmailAvailable(email);
        return {
            available: isAvailable,
            email: email?.toLowerCase(),
            message: isAvailable ? 'Email is available' : 'Email is already registered'
        };
    }
};
exports.RegistrationController = RegistrationController;
__decorate([
    (0, common_1.Post)('owner'),
    (0, swagger_1.ApiOperation)({
        summary: '🏠 Register as Pet Owner',
        description: `
**Create a new pet owner account**

Register to manage your pets' health, vaccinations, and veterinary care.

Required information:
- **Name**: Your full name
- **Email**: Valid email address (will be used for login)
- **Phone**: Romanian phone number (+40XXXXXXXXX)
- **Password**: Secure password (min 8 chars, uppercase, lowercase, number)

Optional:
- **Preferences**: Notification settings and language preferences
    `
    }),
    (0, swagger_1.ApiBody)({
        type: register_dto_1.RegisterDto,
        examples: {
            owner: {
                summary: '🏠 Pet Owner Registration',
                description: 'Complete registration for a pet owner',
                value: {
                    name: 'Maria Popescu',
                    email: 'maria.popescu@gmail.com',
                    phone: '+40722123456',
                    password: 'MySecurePass123!',
                    preferences: {
                        notifications: {
                            email: true,
                            push: true,
                            reminders: true
                        },
                        language: 'ro'
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '✅ Pet owner account created successfully',
        schema: {
            properties: {
                success: { type: 'boolean', example: true },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'number', example: 3 },
                        name: { type: 'string', example: 'Maria Popescu' },
                        email: { type: 'string', example: 'maria.popescu@gmail.com' },
                        phone: { type: 'string', example: '+40722123456' },
                        type: { type: 'string', example: 'owner' },
                        created_at: { type: 'string', example: '2025-09-03T12:15:00Z' }
                    }
                },
                message: { type: 'string', example: 'Pet owner account created successfully' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: '❌ Email already exists',
        schema: {
            properties: {
                statusCode: { type: 'number', example: 409 },
                message: { type: 'string', example: 'Email already registered' },
                timestamp: { type: 'string' },
                path: { type: 'string' }
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], RegistrationController.prototype, "registerOwner", null);
__decorate([
    (0, common_1.Post)('veterinarian'),
    (0, swagger_1.ApiOperation)({
        summary: '🏥 Register as Veterinarian',
        description: `
**Create a new veterinarian account**

Register to manage consultations, vaccinations, and provide veterinary services.

Required information:
- **Personal Details**: Name, email, phone, password
- **Professional Details**: Clinic name, address, license number
- **Optional**: Specializations and working hours
    `
    }),
    (0, swagger_1.ApiBody)({
        type: register_dto_1.RegisterDto,
        examples: {
            veterinarian: {
                summary: '🏥 Veterinarian Registration',
                description: 'Complete registration for a veterinarian',
                value: {
                    name: 'Dr. Ion Marinescu',
                    email: 'ion.marinescu@veterinar.ro',
                    phone: '+40721987654',
                    password: 'VetSecure123!',
                    type: 'veterinarian',
                    clinic_name: 'Clinica Veterinară AnimalCare',
                    clinic_address: 'Str. Sănătății nr. 45, București, Sector 2',
                    license_number: 'VET-BUC-2024-001',
                    specializations: ['Chirurgie', 'Oftalmologie', 'Cardiologie'],
                    working_hours: {
                        monday: '08:00-18:00',
                        tuesday: '08:00-18:00',
                        wednesday: '08:00-18:00',
                        thursday: '08:00-18:00',
                        friday: '08:00-18:00',
                        saturday: '09:00-14:00',
                        sunday: 'closed'
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '✅ Veterinarian account created successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '❌ Missing required veterinarian information'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], RegistrationController.prototype, "registerVeterinarian", null);
__decorate([
    (0, common_1.Post)('check-email'),
    (0, swagger_1.ApiOperation)({
        summary: '📧 Check Email Availability',
        description: 'Check if an email address is available for registration'
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            properties: {
                email: { type: 'string', example: 'test@example.com' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Email availability check completed',
        schema: {
            properties: {
                available: { type: 'boolean' },
                email: { type: 'string' },
                message: { type: 'string' }
            }
        }
    }),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegistrationController.prototype, "checkEmailAvailability", null);
exports.RegistrationController = RegistrationController = __decorate([
    (0, swagger_1.ApiTags)('registration'),
    (0, common_1.Controller)('register'),
    __metadata("design:paramtypes", [registration_service_1.RegistrationService])
], RegistrationController);
//# sourceMappingURL=registration.controller.js.map