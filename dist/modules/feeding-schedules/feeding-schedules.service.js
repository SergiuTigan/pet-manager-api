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
exports.FeedingSchedulesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const feeding_schedule_entity_1 = require("../../entities/feeding-schedule.entity");
let FeedingSchedulesService = class FeedingSchedulesService {
    constructor(feedingScheduleRepository) {
        this.feedingScheduleRepository = feedingScheduleRepository;
    }
    async findAll() {
        return this.feedingScheduleRepository.find({
            relations: ['pet'],
            order: { created_at: 'DESC' },
        });
    }
    async findOne(id) {
        return this.feedingScheduleRepository.findOne({
            where: { id },
            relations: ['pet'],
        });
    }
    async findByPetId(petId) {
        return this.feedingScheduleRepository.find({
            where: { pet_id: petId },
            relations: ['pet'],
            order: { created_at: 'DESC' },
        });
    }
    async findByFoodType(foodType) {
        return this.feedingScheduleRepository.find({
            where: { food_type: foodType },
            relations: ['pet'],
            order: { created_at: 'DESC' },
        });
    }
    async getStatistics() {
        const schedules = await this.findAll();
        const foodTypeBreakdown = schedules.reduce((acc, schedule) => {
            acc[schedule.food_type] = (acc[schedule.food_type] || 0) + 1;
            return acc;
        }, {});
        const brandBreakdown = schedules.reduce((acc, schedule) => {
            acc[schedule.food_brand] = (acc[schedule.food_brand] || 0) + 1;
            return acc;
        }, {});
        const mealsBreakdown = schedules.reduce((acc, schedule) => {
            const meals = schedule.meals_per_day.toString();
            acc[meals] = (acc[meals] || 0) + 1;
            return acc;
        }, {});
        const withSupplements = schedules.filter(s => s.supplements && s.supplements.length > 0).length;
        const withRestrictions = schedules.filter(s => s.dietary_restrictions && s.dietary_restrictions.length > 0).length;
        const allowTreats = schedules.filter(s => s.treats_allowed).length;
        const totalDailyAmount = schedules.reduce((sum, s) => sum + s.daily_amount, 0);
        const averageDailyAmount = schedules.length > 0 ? totalDailyAmount / schedules.length : 0;
        return {
            total: schedules.length,
            by_food_type: foodTypeBreakdown,
            by_brand: brandBreakdown,
            by_meals_per_day: mealsBreakdown,
            with_supplements: withSupplements,
            with_dietary_restrictions: withRestrictions,
            treats_allowed: allowTreats,
            average_daily_amount: Math.round(averageDailyAmount * 100) / 100,
            total_pets_with_schedule: schedules.length,
        };
    }
    async getRecommendations(id) {
        const schedule = await this.findOne(id);
        if (!schedule)
            return null;
        const recommendations = [];
        if (schedule.pet && schedule.pet.weight) {
            const weightKg = Number(schedule.pet.weight);
            const recommendedDaily = weightKg * 25;
            if (schedule.daily_amount > recommendedDaily * 1.2) {
                recommendations.push({
                    type: 'warning',
                    message: 'Cantitatea zilnică de hrană pare să fie prea mare pentru greutatea animalului',
                    suggestion: `Cantitate recomandată: ${Math.round(recommendedDaily)}g pe zi`,
                });
            }
            else if (schedule.daily_amount < recommendedDaily * 0.8) {
                recommendations.push({
                    type: 'warning',
                    message: 'Cantitatea zilnică de hrană pare să fie prea mică pentru greutatea animalului',
                    suggestion: `Cantitate recomandată: ${Math.round(recommendedDaily)}g pe zi`,
                });
            }
            else {
                recommendations.push({
                    type: 'success',
                    message: 'Cantitatea zilnică de hrană este adecvată pentru greutatea animalului',
                });
            }
        }
        if (schedule.meals_per_day < 2) {
            recommendations.push({
                type: 'info',
                message: 'Pentru o digestie mai bună, se recomandă împărțirea hranei în cel puțin 2 mese pe zi',
            });
        }
        if (schedule.treats_allowed && schedule.treats_daily_limit > schedule.daily_amount * 0.1) {
            recommendations.push({
                type: 'warning',
                message: 'Cantitatea de recompense nu ar trebui să depășească 10% din hrana zilnică',
            });
        }
        if (schedule.pet && schedule.pet.medical_conditions && schedule.pet.medical_conditions.length > 0) {
            recommendations.push({
                type: 'info',
                message: 'Având în vedere condițiile medicale ale animalului, consultați veterinarul pentru suplimente specifice',
            });
        }
        return {
            schedule_id: id,
            recommendations,
            last_updated: new Date().toISOString(),
        };
    }
    async addFeedingNote(id, feedingNoteDto) {
        const schedule = await this.findOne(id);
        if (!schedule)
            throw new Error('Feeding schedule not found');
        const newNote = {
            date: new Date().toISOString().split('T')[0],
            ...feedingNoteDto,
        };
        const updatedNotes = [...(schedule.feeding_notes || []), newNote];
        await this.feedingScheduleRepository.update(id, { feeding_notes: updatedNotes });
        return this.findOne(id);
    }
    async create(createScheduleDto) {
        const schedule = this.feedingScheduleRepository.create(createScheduleDto);
        return (await this.feedingScheduleRepository.save(schedule));
    }
    async update(id, updateScheduleDto) {
        await this.feedingScheduleRepository.update(id, updateScheduleDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.feedingScheduleRepository.delete(id);
    }
};
exports.FeedingSchedulesService = FeedingSchedulesService;
exports.FeedingSchedulesService = FeedingSchedulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(feeding_schedule_entity_1.FeedingSchedule)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], FeedingSchedulesService);
//# sourceMappingURL=feeding-schedules.service.js.map