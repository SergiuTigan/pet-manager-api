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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../modules/users/users.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmailWithPassword(email);
        if (user) {
            if (user.password) {
                const isValidPassword = await bcrypt.compare(password, user.password);
                if (!isValidPassword) {
                    return null;
                }
            }
            const { password: hashedPassword, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id, type: user.type };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                type: user.type,
                avatar: user.avatar,
                created_at: user.created_at,
                last_login: user.last_login,
                ...(user.type === 'veterinarian' && {
                    clinic_name: user.clinic_name,
                    clinic_address: user.clinic_address,
                    license_number: user.license_number,
                    specializations: user.specializations,
                    working_hours: user.working_hours
                })
            },
            expires_in: '24h',
        };
    }
    async loginDemo(userType) {
        const demoUsers = await this.usersService.findByType(userType);
        const demoUser = demoUsers[0];
        if (!demoUser) {
            throw new Error(`No demo ${userType} available`);
        }
        return this.login(demoUser);
    }
    async hashPassword(password) {
        const saltRounds = 12;
        return bcrypt.hash(password, saltRounds);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map