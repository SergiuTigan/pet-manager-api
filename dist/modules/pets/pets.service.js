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
exports.PetsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pet_entity_1 = require("../../entities/pet.entity");
const vaccination_entity_1 = require("../../entities/vaccination.entity");
const consultation_entity_1 = require("../../entities/consultation.entity");
const document_entity_1 = require("../../entities/document.entity");
const feeding_schedule_entity_1 = require("../../entities/feeding-schedule.entity");
let PetsService = class PetsService {
    constructor(petRepository, vaccinationRepository, consultationRepository, documentRepository, feedingScheduleRepository) {
        this.petRepository = petRepository;
        this.vaccinationRepository = vaccinationRepository;
        this.consultationRepository = consultationRepository;
        this.documentRepository = documentRepository;
        this.feedingScheduleRepository = feedingScheduleRepository;
    }
    async findAll() {
        return this.petRepository.find({
            relations: ['owner'],
            order: { created_at: 'DESC' },
        });
    }
    async findOne(id) {
        return this.petRepository.findOne({
            where: { id },
            relations: ['owner'],
        });
    }
    async findByOwnerId(ownerId) {
        return this.petRepository.find({
            where: { owner_id: ownerId },
            relations: ['owner'],
            order: { created_at: 'DESC' },
        });
    }
    async findBySpecies(species) {
        return this.petRepository.find({
            where: { species },
            relations: ['owner'],
            order: { created_at: 'DESC' },
        });
    }
    async searchPets(query) {
        return this.petRepository.find({
            where: [
                { name: (0, typeorm_2.Like)(`%${query}%`) },
                { breed: (0, typeorm_2.Like)(`%${query}%`) },
                { microchip: (0, typeorm_2.Like)(`%${query}%`) },
            ],
            relations: ['owner'],
            order: { created_at: 'DESC' },
        });
    }
    async getPetVaccinations(petId) {
        return this.vaccinationRepository.find({
            where: { pet_id: petId },
            relations: ['administered_by_vet'],
            order: { date_administered: 'DESC' },
        });
    }
    async getPetConsultations(petId) {
        return this.consultationRepository.find({
            where: { pet_id: petId },
            relations: ['veterinarian'],
            order: { appointment_date: 'DESC' },
        });
    }
    async getPetDocuments(petId) {
        return this.documentRepository.find({
            where: { pet_id: petId },
            relations: ['uploaded_by_user'],
            order: { created_at: 'DESC' },
        });
    }
    async getPetFeedingSchedule(petId) {
        return this.feedingScheduleRepository.findOne({
            where: { pet_id: petId },
            order: { created_at: 'DESC' },
        });
    }
    async getHealthSummary(petId) {
        const pet = await this.findOne(petId);
        if (!pet)
            return null;
        const vaccinations = await this.getPetVaccinations(petId);
        const consultations = await this.getPetConsultations(petId);
        const documents = await this.getPetDocuments(petId);
        const feedingSchedule = await this.getPetFeedingSchedule(petId);
        const vaccinationStatus = {
            total: vaccinations.length,
            valid: vaccinations.filter(v => v.status === 'valid').length,
            due_soon: vaccinations.filter(v => v.status === 'due_soon').length,
            expired: vaccinations.filter(v => v.status === 'expired').length,
        };
        const lastConsultation = consultations
            .sort((a, b) => new Date(b.appointment_date).getTime() - new Date(a.appointment_date).getTime())[0];
        const upcomingVaccinations = vaccinations
            .filter(v => v.status === 'due_soon')
            .sort((a, b) => new Date(a.next_due_date).getTime() - new Date(b.next_due_date).getTime());
        return {
            pet,
            vaccination_status: vaccinationStatus,
            last_consultation: lastConsultation,
            upcoming_vaccinations: upcomingVaccinations,
            total_documents: documents.length,
            has_feeding_schedule: !!feedingSchedule,
            health_alerts: [
                ...vaccinations
                    .filter(v => v.status === 'expired')
                    .map(v => ({
                    type: 'vaccination_expired',
                    message: `Vaccinul ${v.vaccine_name} a expirat`,
                    severity: 'high',
                    date: v.next_due_date,
                })),
                ...vaccinations
                    .filter(v => v.status === 'due_soon')
                    .map(v => ({
                    type: 'vaccination_due',
                    message: `Vaccinul ${v.vaccine_name} este programat în curând`,
                    severity: 'medium',
                    date: v.next_due_date,
                })),
            ],
        };
    }
    async getStatistics() {
        const pets = await this.findAll();
        const totalPets = pets.length;
        const activePets = pets.filter(pet => pet.is_active).length;
        const speciesBreakdown = pets.reduce((acc, pet) => {
            acc[pet.species] = (acc[pet.species] || 0) + 1;
            return acc;
        }, {});
        const genderBreakdown = pets.reduce((acc, pet) => {
            acc[pet.gender] = (acc[pet.gender] || 0) + 1;
            return acc;
        }, {});
        const ageGroups = pets.reduce((acc, pet) => {
            if (pet.birth_date) {
                const age = new Date().getFullYear() - new Date(pet.birth_date).getFullYear();
                if (age < 1)
                    acc['<1'] = (acc['<1'] || 0) + 1;
                else if (age < 3)
                    acc['1-3'] = (acc['1-3'] || 0) + 1;
                else if (age < 7)
                    acc['3-7'] = (acc['3-7'] || 0) + 1;
                else
                    acc['7+'] = (acc['7+'] || 0) + 1;
            }
            return acc;
        }, {});
        return {
            total: totalPets,
            active: activePets,
            by_species: speciesBreakdown,
            by_gender: genderBreakdown,
            by_age_group: ageGroups,
            neutered: pets.filter(p => p.is_neutered).length,
            with_insurance: pets.filter(p => p.insurance).length,
            with_microchip: pets.filter(p => p.microchip).length,
        };
    }
    async create(createPetDto) {
        const pet = this.petRepository.create(createPetDto);
        return this.petRepository.save(pet);
    }
    async update(id, updatePetDto) {
        await this.petRepository.update(id, updatePetDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.petRepository.delete(id);
    }
};
exports.PetsService = PetsService;
exports.PetsService = PetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pet_entity_1.Pet)),
    __param(1, (0, typeorm_1.InjectRepository)(vaccination_entity_1.Vaccination)),
    __param(2, (0, typeorm_1.InjectRepository)(consultation_entity_1.Consultation)),
    __param(3, (0, typeorm_1.InjectRepository)(document_entity_1.Document)),
    __param(4, (0, typeorm_1.InjectRepository)(feeding_schedule_entity_1.FeedingSchedule)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object])
], PetsService);
//# sourceMappingURL=pets.service.js.map