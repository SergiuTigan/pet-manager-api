"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MockDataService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockDataService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let MockDataService = MockDataService_1 = class MockDataService {
    constructor() {
        this.logger = new common_1.Logger(MockDataService_1.name);
        this.dataPath = path.join(process.cwd(), '..', 'mock-data');
        this.users = [];
        this.pets = [];
        this.vaccinations = [];
        this.consultations = [];
        this.documents = [];
        this.feedingSchedules = [];
        this.notifications = [];
    }
    async onModuleInit() {
        await this.loadMockData();
    }
    async loadMockData() {
        try {
            this.logger.log('Loading mock data...');
            this.users = await this.loadJsonFile('users.json');
            this.pets = await this.loadJsonFile('pets.json');
            this.vaccinations = await this.loadJsonFile('vaccinations.json');
            this.consultations = await this.loadJsonFile('consultations.json');
            this.documents = await this.loadJsonFile('documents.json');
            this.feedingSchedules = await this.loadJsonFile('feeding-schedules.json');
            this.notifications = await this.loadJsonFile('notifications.json');
            this.logger.log(`Loaded ${this.users.length} users`);
            this.logger.log(`Loaded ${this.pets.length} pets`);
            this.logger.log(`Loaded ${this.vaccinations.length} vaccinations`);
            this.logger.log(`Loaded ${this.consultations.length} consultations`);
            this.logger.log(`Loaded ${this.documents.length} documents`);
            this.logger.log(`Loaded ${this.feedingSchedules.length} feeding schedules`);
            this.logger.log(`Loaded ${this.notifications.length} notifications`);
        }
        catch (error) {
            this.logger.error('Error loading mock data:', error);
            throw error;
        }
    }
    async loadJsonFile(filename) {
        const filePath = path.join(this.dataPath, filename);
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        }
        catch (error) {
            this.logger.error(`Error loading ${filename}:`, error);
            return [];
        }
    }
    getUsers() {
        return this.users;
    }
    getUserById(id) {
        return this.users.find(user => user.id === id);
    }
    getUserByEmail(email) {
        return this.users.find(user => user.email === email);
    }
    getUsersByType(type) {
        return this.users.filter(user => user.type === type);
    }
    getPets() {
        return this.pets;
    }
    getPetById(id) {
        return this.pets.find(pet => pet.id === id);
    }
    getPetsByOwnerId(ownerId) {
        return this.pets.filter(pet => pet.owner_id === ownerId);
    }
    getPetsBySpecies(species) {
        return this.pets.filter(pet => pet.species === species);
    }
    getVaccinations() {
        return this.vaccinations;
    }
    getVaccinationById(id) {
        return this.vaccinations.find(vaccination => vaccination.id === id);
    }
    getVaccinationsByPetId(petId) {
        return this.vaccinations.filter(vaccination => vaccination.pet_id === petId);
    }
    getVaccinationsByStatus(status) {
        return this.vaccinations.filter(vaccination => vaccination.status === status);
    }
    getVaccinationsByVetId(vetId) {
        return this.vaccinations.filter(vaccination => vaccination.administered_by_vet_id === vetId);
    }
    getConsultations() {
        return this.consultations;
    }
    getConsultationById(id) {
        return this.consultations.find(consultation => consultation.id === id);
    }
    getConsultationsByPetId(petId) {
        return this.consultations.filter(consultation => consultation.pet_id === petId);
    }
    getConsultationsByVetId(vetId) {
        return this.consultations.filter(consultation => consultation.vet_id === vetId);
    }
    getConsultationsByStatus(status) {
        return this.consultations.filter(consultation => consultation.status === status);
    }
    getDocuments() {
        return this.documents;
    }
    getDocumentById(id) {
        return this.documents.find(document => document.id === id);
    }
    getDocumentsByPetId(petId) {
        return this.documents.filter(document => document.pet_id === petId);
    }
    getDocumentsByType(type) {
        return this.documents.filter(document => document.document_type === type);
    }
    getPublicDocuments() {
        return this.documents.filter(document => document.is_public);
    }
    getFeedingSchedules() {
        return this.feedingSchedules;
    }
    getFeedingScheduleById(id) {
        return this.feedingSchedules.find(schedule => schedule.id === id);
    }
    getFeedingScheduleByPetId(petId) {
        return this.feedingSchedules.find(schedule => schedule.pet_id === petId);
    }
    getNotifications() {
        return this.notifications;
    }
    getNotificationById(id) {
        return this.notifications.find(notification => notification.id === id);
    }
    getNotificationsByUserId(userId) {
        return this.notifications.filter(notification => notification.user_id === userId);
    }
    getUnreadNotificationsByUserId(userId) {
        return this.notifications.filter(notification => notification.user_id === userId && !notification.is_read);
    }
    getNotificationsByPriority(priority) {
        return this.notifications.filter(notification => notification.priority === priority);
    }
    getStatistics() {
        const totalPets = this.pets.length;
        const activePets = this.pets.filter(pet => pet.is_active).length;
        const totalOwners = this.users.filter(user => user.type === 'owner').length;
        const totalVets = this.users.filter(user => user.type === 'veterinarian').length;
        const vaccinationStats = {
            total: this.vaccinations.length,
            valid: this.vaccinations.filter(v => v.status === 'valid').length,
            due_soon: this.vaccinations.filter(v => v.status === 'due_soon').length,
            expired: this.vaccinations.filter(v => v.status === 'expired').length,
        };
        const consultationStats = {
            total: this.consultations.length,
            completed: this.consultations.filter(c => c.status === 'completed').length,
            scheduled: this.consultations.filter(c => c.status === 'scheduled').length,
            in_progress: this.consultations.filter(c => c.status === 'in_progress').length,
        };
        const speciesBreakdown = this.pets.reduce((acc, pet) => {
            acc[pet.species] = (acc[pet.species] || 0) + 1;
            return acc;
        }, {});
        return {
            pets: {
                total: totalPets,
                active: activePets,
                by_species: speciesBreakdown,
            },
            users: {
                total_owners: totalOwners,
                total_vets: totalVets,
            },
            vaccinations: vaccinationStats,
            consultations: consultationStats,
            documents: {
                total: this.documents.length,
                public: this.documents.filter(d => d.is_public).length,
            },
            notifications: {
                total: this.notifications.length,
                unread: this.notifications.filter(n => !n.is_read).length,
                urgent: this.notifications.filter(n => n.priority === 'urgent').length,
            },
        };
    }
    searchPets(query) {
        const lowercaseQuery = query.toLowerCase();
        return this.pets.filter(pet => pet.name.toLowerCase().includes(lowercaseQuery) ||
            pet.breed.toLowerCase().includes(lowercaseQuery) ||
            pet.species.toLowerCase().includes(lowercaseQuery) ||
            pet.microchip.toLowerCase().includes(lowercaseQuery));
    }
    searchUsers(query) {
        const lowercaseQuery = query.toLowerCase();
        return this.users.filter(user => user.name.toLowerCase().includes(lowercaseQuery) ||
            user.email.toLowerCase().includes(lowercaseQuery) ||
            (user.clinic_name && user.clinic_name.toLowerCase().includes(lowercaseQuery)));
    }
    getDashboardDataForUser(userId) {
        const user = this.getUserById(userId);
        if (!user)
            return null;
        if (user.type === 'owner') {
            const userPets = this.getPetsByOwnerId(userId);
            const userNotifications = this.getUnreadNotificationsByUserId(userId);
            const petIds = userPets.map(p => p.id);
            const userVaccinations = this.vaccinations.filter(v => petIds.includes(v.pet_id));
            const userConsultations = this.consultations.filter(c => petIds.includes(c.pet_id));
            return {
                user,
                pets: userPets,
                notifications: userNotifications,
                stats: {
                    total_pets: userPets.length,
                    active_pets: userPets.filter(p => p.is_active).length,
                    vaccinations_due_soon: userVaccinations.filter(v => v.status === 'due_soon').length,
                    vaccinations_expired: userVaccinations.filter(v => v.status === 'expired').length,
                    upcoming_appointments: userConsultations.filter(c => c.status === 'scheduled').length,
                },
                recent_activity: [
                    ...userVaccinations.slice(-3).map(v => ({
                        type: 'vaccination',
                        date: v.date_administered,
                        description: `${v.vaccine_name} administered to ${this.getPetById(v.pet_id)?.name}`,
                    })),
                    ...userConsultations.slice(-3).map(c => ({
                        type: 'consultation',
                        date: c.appointment_date,
                        description: `${c.consultation_type} for ${this.getPetById(c.pet_id)?.name}`,
                    })),
                ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5),
            };
        }
        else if (user.type === 'veterinarian') {
            const vetConsultations = this.getConsultationsByVetId(userId);
            const vetVaccinations = this.getVaccinationsByVetId(userId);
            const vetNotifications = this.getUnreadNotificationsByUserId(userId);
            return {
                user,
                notifications: vetNotifications,
                stats: {
                    total_consultations: vetConsultations.length,
                    today_appointments: vetConsultations.filter(c => {
                        const today = new Date().toISOString().split('T')[0];
                        return c.appointment_date.split('T')[0] === today;
                    }).length,
                    pending_appointments: vetConsultations.filter(c => c.status === 'scheduled').length,
                    completed_today: vetConsultations.filter(c => {
                        const today = new Date().toISOString().split('T')[0];
                        return c.appointment_date.split('T')[0] === today && c.status === 'completed';
                    }).length,
                },
                recent_activity: [
                    ...vetConsultations.slice(-5).map(c => ({
                        type: 'consultation',
                        date: c.appointment_date,
                        description: `${c.consultation_type} for ${this.getPetById(c.pet_id)?.name}`,
                        pet: this.getPetById(c.pet_id),
                        owner: this.getUserById(this.getPetById(c.pet_id)?.owner_id),
                    })),
                ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
            };
        }
        return null;
    }
};
exports.MockDataService = MockDataService;
exports.MockDataService = MockDataService = MockDataService_1 = __decorate([
    (0, common_1.Injectable)()
], MockDataService);
//# sourceMappingURL=mock-data.service.js.map