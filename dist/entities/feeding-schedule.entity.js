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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedingSchedule = void 0;
const typeorm_1 = require("typeorm");
const interfaces_1 = require("../common/interfaces");
const pet_entity_1 = require("./pet.entity");
let FeedingSchedule = class FeedingSchedule {
};
exports.FeedingSchedule = FeedingSchedule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FeedingSchedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FeedingSchedule.prototype, "food_brand", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: interfaces_1.FoodType
    }),
    __metadata("design:type", String)
], FeedingSchedule.prototype, "food_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FeedingSchedule.prototype, "daily_amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FeedingSchedule.prototype, "daily_amount_unit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FeedingSchedule.prototype, "meals_per_day", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], FeedingSchedule.prototype, "meal_times", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], FeedingSchedule.prototype, "special_instructions", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], FeedingSchedule.prototype, "treats_allowed", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], FeedingSchedule.prototype, "treats_daily_limit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FeedingSchedule.prototype, "treats_daily_limit_unit", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], FeedingSchedule.prototype, "dietary_restrictions", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], FeedingSchedule.prototype, "supplements", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], FeedingSchedule.prototype, "feeding_notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], FeedingSchedule.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], FeedingSchedule.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pet_entity_1.Pet, pet => pet.feeding_schedules),
    (0, typeorm_1.JoinColumn)({ name: 'pet_id' }),
    __metadata("design:type", pet_entity_1.Pet)
], FeedingSchedule.prototype, "pet", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FeedingSchedule.prototype, "pet_id", void 0);
exports.FeedingSchedule = FeedingSchedule = __decorate([
    (0, typeorm_1.Entity)('feeding_schedules')
], FeedingSchedule);
//# sourceMappingURL=feeding-schedule.entity.js.map