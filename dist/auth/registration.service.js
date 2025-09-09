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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const interfaces_1 = require("../common/interfaces");
const bcrypt = require("bcrypt");
let RegistrationService = class RegistrationService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async register(registerDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: registerDto.email.toLowerCase() }
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email already registered');
        }
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);
        const userData = {
            ...registerDto,
            email: registerDto.email.toLowerCase(),
            password: hashedPassword,
            type: registerDto.type || interfaces_1.UserType.OWNER,
            preferences: registerDto.preferences || {
                notifications: {
                    email: true,
                    push: true,
                    reminders: true,
                },
                language: 'ro',
            },
        };
        const { password, ...safeUserData } = userData;
        try {
            const user = this.userRepository.create(userData);
            const savedUser = await this.userRepository.save(user);
            const { preferences, password: hashedPassword, ...safeUserData } = savedUser;
            const publicUserData = {
                id: safeUserData.id,
                email: safeUserData.email,
                name: safeUserData.name,
                phone: safeUserData.phone,
                type: safeUserData.type,
                avatar: safeUserData.avatar,
                created_at: safeUserData.created_at,
                last_login: safeUserData.last_login,
                clinic_name: safeUserData.clinic_name,
                clinic_address: safeUserData.clinic_address,
                license_number: safeUserData.license_number,
                specializations: safeUserData.specializations,
                working_hours: safeUserData.working_hours,
            };
            const userTypeMessage = savedUser.type === interfaces_1.UserType.VETERINARIAN ? 'veterinarian' : 'pet owner';
            return {
                success: true,
                data: publicUserData,
                message: `${userTypeMessage} account created successfully`
            };
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('Email already registered');
            }
            throw error;
        }
    }
    async isEmailAvailable(email) {
        if (!email)
            return false;
        const existingUser = await this.userRepository.findOne({
            where: { email: email.toLowerCase() }
        });
        return !existingUser;
    }
    async validateRegistrationData(registerDto) {
        const errors = [];
        if (!await this.isEmailAvailable(registerDto.email)) {
            errors.push('Email is already registered');
        }
        if (registerDto.type === interfaces_1.UserType.VETERINARIAN) {
            if (!registerDto.clinic_name) {
                errors.push('Clinic name is required for veterinarians');
            }
            if (!registerDto.clinic_address) {
                errors.push('Clinic address is required for veterinarians');
            }
            if (!registerDto.license_number) {
                errors.push('License number is required for veterinarians');
            }
        }
        return errors;
    }
    async getRegistrationStatistics() {
        const totalUsers = await this.userRepository.count();
        const ownersCount = await this.userRepository.count({ where: { type: interfaces_1.UserType.OWNER } });
        const vetsCount = await this.userRepository.count({ where: { type: interfaces_1.UserType.VETERINARIAN } });
        const recentRegistrations = await this.userRepository.count({
            where: {
                created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
        });
        return {
            total_users: totalUsers,
            owners: ownersCount,
            veterinarians: vetsCount,
            recent_registrations_7_days: recentRegistrations,
            registration_rate: totalUsers > 0 ? Math.round((recentRegistrations / totalUsers) * 100) : 0,
        };
    }
};
exports.RegistrationService = RegistrationService;
exports.RegistrationService = RegistrationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], RegistrationService);
//# sourceMappingURL=registration.service.js.map