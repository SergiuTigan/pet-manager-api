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
exports.VaccinationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vaccination_entity_1 = require("../../entities/vaccination.entity");
let VaccinationsService = class VaccinationsService {
    constructor(vaccinationRepository) {
        this.vaccinationRepository = vaccinationRepository;
    }
    async findAll() {
        return this.vaccinationRepository.find({
            relations: ['pet', 'administered_by_vet'],
            order: { date_administered: 'DESC' },
        });
    }
    async findOne(id) {
        return this.vaccinationRepository.findOne({
            where: { id },
            relations: ['pet', 'administered_by_vet'],
        });
    }
    async findByPetId(petId) {
        return this.vaccinationRepository.find({
            where: { pet_id: petId },
            relations: ['pet', 'administered_by_vet'],
            order: { date_administered: 'DESC' },
        });
    }
    async findByVetId(vetId) {
        return this.vaccinationRepository.find({
            where: { administered_by_vet_id: vetId },
            relations: ['pet', 'administered_by_vet'],
            order: { date_administered: 'DESC' },
        });
    }
    async findByStatus(status) {
        return this.vaccinationRepository.find({
            where: { status },
            relations: ['pet', 'administered_by_vet'],
            order: { date_administered: 'DESC' },
        });
    }
    async findByType(type) {
        return this.vaccinationRepository.find({
            where: { vaccine_type: type },
            relations: ['pet', 'administered_by_vet'],
            order: { date_administered: 'DESC' },
        });
    }
    async getVaccinationsDueSoon(days = 30) {
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + days);
        return this.vaccinationRepository
            .createQueryBuilder('vaccination')
            .leftJoinAndSelect('vaccination.pet', 'pet')
            .leftJoinAndSelect('vaccination.administered_by_vet', 'vet')
            .where('vaccination.next_due_date >= :today', { today })
            .andWhere('vaccination.next_due_date <= :futureDate', { futureDate })
            .orderBy('vaccination.next_due_date', 'ASC')
            .getMany();
    }
    async getCertificate(vaccinationId) {
        const vaccination = await this.findOne(vaccinationId);
        if (!vaccination || !vaccination.certificate_number) {
            return null;
        }
        return {
            vaccination_id: vaccination.id,
            certificate_number: vaccination.certificate_number,
            pet_id: vaccination.pet_id,
            vaccine_name: vaccination.vaccine_name,
            date_administered: vaccination.date_administered,
            administered_by: vaccination.clinic_name,
            batch_number: vaccination.batch_number,
            valid_until: vaccination.next_due_date,
            generated_at: new Date().toISOString(),
        };
    }
    async getStatistics() {
        const vaccinations = await this.findAll();
        const statusBreakdown = vaccinations.reduce((acc, vaccination) => {
            acc[vaccination.status] = (acc[vaccination.status] || 0) + 1;
            return acc;
        }, {});
        const typeBreakdown = vaccinations.reduce((acc, vaccination) => {
            acc[vaccination.vaccine_type] = (acc[vaccination.vaccine_type] || 0) + 1;
            return acc;
        }, {});
        const manufacturerBreakdown = vaccinations.reduce((acc, vaccination) => {
            const manufacturer = vaccination.manufacturer.split(' ')[0];
            acc[manufacturer] = (acc[manufacturer] || 0) + 1;
            return acc;
        }, {});
        const dueSoonCount = (await this.getVaccinationsDueSoon(30)).length;
        const dueSoonUrgent = (await this.getVaccinationsDueSoon(7)).length;
        return {
            total: vaccinations.length,
            by_status: statusBreakdown,
            by_type: typeBreakdown,
            by_manufacturer: manufacturerBreakdown,
            due_soon: {
                next_30_days: dueSoonCount,
                next_7_days: dueSoonUrgent,
            },
            coverage_percentage: Math.round((statusBreakdown.valid / vaccinations.length) * 100),
            certificates_issued: vaccinations.filter(v => v.certificate_number).length,
        };
    }
    async create(createVaccinationDto) {
        const vaccination = this.vaccinationRepository.create(createVaccinationDto);
        return (await this.vaccinationRepository.save(vaccination));
    }
    async update(id, updateVaccinationDto) {
        await this.vaccinationRepository.update(id, updateVaccinationDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.vaccinationRepository.delete(id);
    }
};
exports.VaccinationsService = VaccinationsService;
exports.VaccinationsService = VaccinationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vaccination_entity_1.Vaccination)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], VaccinationsService);
//# sourceMappingURL=vaccinations.service.js.map