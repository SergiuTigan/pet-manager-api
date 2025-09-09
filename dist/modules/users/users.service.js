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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../entities/user.entity");
const pet_entity_1 = require("../../entities/pet.entity");
const consultation_entity_1 = require("../../entities/consultation.entity");
const vaccination_entity_1 = require("../../entities/vaccination.entity");
const notification_entity_1 = require("../../entities/notification.entity");
const interfaces_1 = require("../../common/interfaces");
let UsersService = class UsersService {
    constructor(userRepository, petRepository, consultationRepository, vaccinationRepository, notificationRepository) {
        this.userRepository = userRepository;
        this.petRepository = petRepository;
        this.consultationRepository = consultationRepository;
        this.vaccinationRepository = vaccinationRepository;
        this.notificationRepository = notificationRepository;
    }
    async findAll() {
        const users = await this.userRepository.find({
            order: { created_at: 'DESC' },
        });
        return users.map(user => this.sanitizeUser(user));
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        return user ? this.sanitizeUser(user) : null;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        return user ? this.sanitizeUser(user) : null;
    }
    async findByEmailWithPassword(email) {
        return this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'name', 'phone', 'type', 'avatar', 'created_at', 'last_login', 'password', 'clinic_name', 'clinic_address', 'license_number', 'specializations', 'working_hours']
        });
    }
    async findByType(type) {
        const users = await this.userRepository.find({
            where: { type },
            order: { created_at: 'DESC' },
        });
        return users.map(user => this.sanitizeUser(user));
    }
    async searchUsers(query) {
        const users = await this.userRepository.find({
            where: [
                { name: (0, typeorm_2.Like)(`%${query}%`) },
                { email: (0, typeorm_2.Like)(`%${query}%`) },
            ],
            order: { created_at: 'DESC' },
        });
        return users.map(user => this.sanitizeUser(user));
    }
    async getUserPets(userId) {
        return this.petRepository.find({
            where: { owner_id: userId },
            order: { created_at: 'DESC' },
        });
    }
    async getUserNotifications(userId) {
        return this.notificationRepository.find({
            where: { user_id: userId },
            relations: ['pet'],
            order: { created_at: 'DESC' },
        });
    }
    async getUnreadNotifications(userId) {
        return this.notificationRepository.find({
            where: { user_id: userId, is_read: false },
            relations: ['pet'],
            order: { created_at: 'DESC' },
        });
    }
    async getDashboardData(userId) {
        const user = await this.findOneWithPreferences(userId);
        if (!user)
            return null;
        const pets = await this.getUserPets(userId);
        const notifications = await this.getUnreadNotifications(userId);
        const consultations = await this.consultationRepository.find({
            where: { pet: { owner_id: userId } },
            relations: ['pet', 'veterinarian'],
            order: { appointment_date: 'DESC' },
            take: 5,
        });
        const upcomingConsultations = consultations.filter(c => {
            return new Date(c.appointment_date) > new Date() && c.status !== 'cancelled';
        });
        return {
            user: this.sanitizeUser(user),
            pets_count: pets.length,
            active_pets: pets.filter(p => p.is_active).length,
            unread_notifications: notifications.length,
            upcoming_consultations: upcomingConsultations.length,
            recent_consultations: consultations.slice(0, 3),
            pets: pets.slice(0, 6),
            urgent_notifications: notifications.filter(n => n.priority === 'urgent'),
        };
    }
    async getVetConsultations(vetId, status) {
        const whereCondition = { vet_id: vetId };
        if (status) {
            whereCondition.status = status;
        }
        return this.consultationRepository.find({
            where: whereCondition,
            relations: ['pet'],
            order: { appointment_date: 'DESC' },
        });
    }
    async getVetVaccinations(vetId) {
        return this.vaccinationRepository.find({
            where: { administered_by_vet_id: vetId },
            relations: ['pet'],
            order: { date_administered: 'DESC' },
        });
    }
    async getStatistics() {
        const users = await this.userRepository.find();
        const owners = users.filter(user => user.type === interfaces_1.UserType.OWNER);
        const vets = users.filter(user => user.type === interfaces_1.UserType.VETERINARIAN);
        const vetSpecializations = vets.reduce((acc, vet) => {
            if (vet.specializations) {
                vet.specializations.forEach(spec => {
                    acc[spec] = (acc[spec] || 0) + 1;
                });
            }
            return acc;
        }, {});
        const recentLogins = users.filter(user => {
            const lastLogin = new Date(user.last_login);
            const daysSinceLogin = (Date.now() - lastLogin.getTime()) / (1000 * 60 * 60 * 24);
            return daysSinceLogin <= 7;
        }).length;
        return {
            total_users: users.length,
            owners: {
                count: owners.length,
                with_multiple_pets: await this.getOwnersWithMultiplePets(owners),
            },
            veterinarians: {
                count: vets.length,
                specializations: vetSpecializations,
                with_working_hours: vets.filter(vet => vet.working_hours).length,
            },
            activity: {
                recent_logins: recentLogins,
                active_percentage: Math.round((recentLogins / users.length) * 100),
            },
        };
    }
    sanitizeUser(user) {
        const { preferences, ...sanitizedUser } = user;
        return sanitizedUser;
    }
    async findOneWithPreferences(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async getOwnersWithMultiplePets(owners) {
        let count = 0;
        for (const owner of owners) {
            const petCount = await this.petRepository.count({ where: { owner_id: owner.id } });
            if (petCount > 1)
                count++;
        }
        return count;
    }
    async create(createUserDto) {
        const user = this.userRepository.create(createUserDto);
        return (await this.userRepository.save(user));
    }
    async update(id, updateUserDto) {
        await this.userRepository.update(id, updateUserDto);
        return this.findOneWithPreferences(id);
    }
    async remove(id) {
        await this.userRepository.delete(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(pet_entity_1.Pet)),
    __param(2, (0, typeorm_1.InjectRepository)(consultation_entity_1.Consultation)),
    __param(3, (0, typeorm_1.InjectRepository)(vaccination_entity_1.Vaccination)),
    __param(4, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object])
], UsersService);
//# sourceMappingURL=users.service.js.map