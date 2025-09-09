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
exports.ConsultationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const consultation_entity_1 = require("../../entities/consultation.entity");
const interfaces_1 = require("../../common/interfaces");
let ConsultationsService = class ConsultationsService {
    constructor(consultationRepository) {
        this.consultationRepository = consultationRepository;
    }
    async findAll() {
        return this.consultationRepository.find({
            relations: ['pet', 'veterinarian'],
            order: { appointment_date: 'DESC' },
        });
    }
    async findOne(id) {
        return this.consultationRepository.findOne({
            where: { id },
            relations: ['pet', 'veterinarian'],
        });
    }
    async findByPetId(petId) {
        return this.consultationRepository.find({
            where: { pet_id: petId },
            relations: ['pet', 'veterinarian'],
            order: { appointment_date: 'DESC' },
        });
    }
    async findByVetId(vetId) {
        return this.consultationRepository.find({
            where: { vet_id: vetId },
            relations: ['pet', 'veterinarian'],
            order: { appointment_date: 'DESC' },
        });
    }
    async findByStatus(status) {
        return this.consultationRepository.find({
            where: { status },
            relations: ['pet', 'veterinarian'],
            order: { appointment_date: 'DESC' },
        });
    }
    async findByType(type) {
        return this.consultationRepository.find({
            where: { consultation_type: type },
            relations: ['pet', 'veterinarian'],
            order: { appointment_date: 'DESC' },
        });
    }
    async getUpcomingConsultations(days = 7) {
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + days);
        return this.consultationRepository
            .createQueryBuilder('consultation')
            .leftJoinAndSelect('consultation.pet', 'pet')
            .leftJoinAndSelect('consultation.veterinarian', 'veterinarian')
            .where('consultation.appointment_date >= :today', { today })
            .andWhere('consultation.appointment_date <= :futureDate', { futureDate })
            .andWhere('consultation.status IN (:...statuses)', {
            statuses: [interfaces_1.ConsultationStatus.SCHEDULED, interfaces_1.ConsultationStatus.IN_PROGRESS]
        })
            .orderBy('consultation.appointment_date', 'ASC')
            .getMany();
    }
    async getStatistics() {
        const consultations = await this.findAll();
        const statusBreakdown = consultations.reduce((acc, consultation) => {
            acc[consultation.status] = (acc[consultation.status] || 0) + 1;
            return acc;
        }, {});
        const typeBreakdown = consultations.reduce((acc, consultation) => {
            acc[consultation.consultation_type] = (acc[consultation.consultation_type] || 0) + 1;
            return acc;
        }, {});
        const totalRevenue = consultations
            .filter(c => c.invoice_paid)
            .reduce((sum, c) => sum + Number(c.invoice_amount), 0);
        const pendingPayments = consultations
            .filter(c => !c.invoice_paid && c.invoice_amount > 0)
            .reduce((sum, c) => sum + Number(c.invoice_amount), 0);
        const upcomingCount = (await this.getUpcomingConsultations(7)).length;
        return {
            total: consultations.length,
            by_status: statusBreakdown,
            by_type: typeBreakdown,
            upcoming_this_week: upcomingCount,
            financial: {
                total_revenue: totalRevenue,
                pending_payments: pendingPayments,
                paid_consultations: consultations.filter(c => c.invoice_paid).length,
            },
            completion_rate: Math.round((statusBreakdown.completed / consultations.length) * 100) || 0,
        };
    }
    async create(createConsultationDto) {
        const consultation = this.consultationRepository.create(createConsultationDto);
        return (await this.consultationRepository.save(consultation));
    }
    async update(id, updateConsultationDto) {
        await this.consultationRepository.update(id, updateConsultationDto);
        return this.findOne(id);
    }
    async updateStatus(id, status) {
        await this.consultationRepository.update(id, { status });
        return this.findOne(id);
    }
    async remove(id) {
        await this.consultationRepository.delete(id);
    }
};
exports.ConsultationsService = ConsultationsService;
exports.ConsultationsService = ConsultationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(consultation_entity_1.Consultation)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ConsultationsService);
//# sourceMappingURL=consultations.service.js.map