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
var SeederService_1;
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const fs = require("fs");
const path = require("path");
let SeederService = SeederService_1 = class SeederService {
    constructor(userRepository, petRepository, vaccinationRepository, consultationRepository, documentRepository, feedingScheduleRepository, notificationRepository) {
        this.userRepository = userRepository;
        this.petRepository = petRepository;
        this.vaccinationRepository = vaccinationRepository;
        this.consultationRepository = consultationRepository;
        this.documentRepository = documentRepository;
        this.feedingScheduleRepository = feedingScheduleRepository;
        this.notificationRepository = notificationRepository;
        this.logger = new common_1.Logger(SeederService_1.name);
    }
    async seedDatabase() {
        try {
            this.logger.log('Starting database seeding...');
            const userCount = await this.userRepository.count();
            if (userCount > 0) {
                this.logger.log('Database already seeded, skipping...');
                return;
            }
            const dataPath = path.join(process.cwd(), '..', 'mock-data');
            const usersData = JSON.parse(fs.readFileSync(path.join(dataPath, 'users.json'), 'utf8'));
            for (const userData of usersData) {
                const user = this.userRepository.create({
                    ...userData,
                    created_at: new Date(userData.created_at),
                    last_login: new Date(userData.last_login),
                });
                await this.userRepository.save(user);
            }
            this.logger.log(`Seeded ${usersData.length} users`);
            const petsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'pets.json'), 'utf8'));
            for (const petData of petsData) {
                const pet = this.petRepository.create({
                    ...petData,
                    birth_date: petData.birth_date ? new Date(petData.birth_date) : null,
                    created_at: new Date(petData.created_at),
                });
                await this.petRepository.save(pet);
            }
            this.logger.log(`Seeded ${petsData.length} pets`);
            const vaccinationsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'vaccinations.json'), 'utf8'));
            for (const vaccinationData of vaccinationsData) {
                const vaccination = this.vaccinationRepository.create({
                    ...vaccinationData,
                    date_administered: new Date(vaccinationData.date_administered),
                    next_due_date: new Date(vaccinationData.next_due_date),
                    created_at: new Date(vaccinationData.created_at),
                });
                await this.vaccinationRepository.save(vaccination);
            }
            this.logger.log(`Seeded ${vaccinationsData.length} vaccinations`);
            const consultationsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'consultations.json'), 'utf8'));
            for (const consultationData of consultationsData) {
                const consultation = this.consultationRepository.create({
                    ...consultationData,
                    appointment_date: new Date(consultationData.appointment_date),
                    next_appointment: consultationData.next_appointment ? new Date(consultationData.next_appointment) : null,
                    created_at: new Date(consultationData.created_at),
                    updated_at: new Date(consultationData.updated_at),
                });
                await this.consultationRepository.save(consultation);
            }
            this.logger.log(`Seeded ${consultationsData.length} consultations`);
            const documentsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'documents.json'), 'utf8'));
            for (const documentData of documentsData) {
                const document = this.documentRepository.create({
                    ...documentData,
                    upload_date: new Date(documentData.upload_date),
                    expiry_date: documentData.expiry_date ? new Date(documentData.expiry_date) : null,
                    created_at: new Date(documentData.created_at),
                });
                await this.documentRepository.save(document);
            }
            this.logger.log(`Seeded ${documentsData.length} documents`);
            const feedingData = JSON.parse(fs.readFileSync(path.join(dataPath, 'feeding-schedules.json'), 'utf8'));
            for (const feedingScheduleData of feedingData) {
                const feedingSchedule = this.feedingScheduleRepository.create({
                    ...feedingScheduleData,
                    created_at: new Date(feedingScheduleData.created_at),
                    updated_at: new Date(feedingScheduleData.updated_at),
                });
                await this.feedingScheduleRepository.save(feedingSchedule);
            }
            this.logger.log(`Seeded ${feedingData.length} feeding schedules`);
            const notificationsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'notifications.json'), 'utf8'));
            for (const notificationData of notificationsData) {
                const notification = this.notificationRepository.create({
                    ...notificationData,
                    scheduled_for: new Date(notificationData.scheduled_for),
                    sent_at: notificationData.sent_at ? new Date(notificationData.sent_at) : null,
                    expires_at: notificationData.expires_at ? new Date(notificationData.expires_at) : null,
                    created_at: new Date(notificationData.created_at),
                });
                await this.notificationRepository.save(notification);
            }
            this.logger.log(`Seeded ${notificationsData.length} notifications`);
            this.logger.log('Database seeding completed successfully!');
        }
        catch (error) {
            this.logger.error('Database seeding failed:', error);
            throw error;
        }
    }
    async clearDatabase() {
        this.logger.log('Clearing database...');
        await this.notificationRepository.clear();
        await this.documentRepository.clear();
        await this.feedingScheduleRepository.clear();
        await this.consultationRepository.clear();
        await this.vaccinationRepository.clear();
        await this.petRepository.clear();
        await this.userRepository.clear();
        this.logger.log('Database cleared successfully!');
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = SeederService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Pet)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.Vaccination)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.Consultation)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.Document)),
    __param(5, (0, typeorm_1.InjectRepository)(entities_1.FeedingSchedule)),
    __param(6, (0, typeorm_1.InjectRepository)(entities_1.Notification)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _f : Object, typeof (_g = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _g : Object])
], SeederService);
//# sourceMappingURL=seeder.service.js.map