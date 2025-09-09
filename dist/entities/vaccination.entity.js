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
exports.Vaccination = void 0;
const typeorm_1 = require("typeorm");
const interfaces_1 = require("../common/interfaces");
const pet_entity_1 = require("./pet.entity");
const user_entity_1 = require("./user.entity");
let Vaccination = class Vaccination {
};
exports.Vaccination = Vaccination;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Vaccination.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vaccination.prototype, "vaccine_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: interfaces_1.VaccineType
    }),
    __metadata("design:type", String)
], Vaccination.prototype, "vaccine_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vaccination.prototype, "manufacturer", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vaccination.prototype, "batch_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Vaccination.prototype, "date_administered", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Vaccination.prototype, "next_due_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vaccination.prototype, "clinic_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Vaccination.prototype, "certificate_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vaccination.prototype, "dose", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vaccination.prototype, "site_of_injection", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Vaccination.prototype, "reaction", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Vaccination.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: interfaces_1.VaccinationStatus,
        default: interfaces_1.VaccinationStatus.VALID
    }),
    __metadata("design:type", String)
], Vaccination.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Vaccination.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pet_entity_1.Pet, pet => pet.vaccinations),
    (0, typeorm_1.JoinColumn)({ name: 'pet_id' }),
    __metadata("design:type", pet_entity_1.Pet)
], Vaccination.prototype, "pet", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Vaccination.prototype, "pet_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.vaccinations_administered),
    (0, typeorm_1.JoinColumn)({ name: 'administered_by_vet_id' }),
    __metadata("design:type", user_entity_1.User)
], Vaccination.prototype, "administered_by_vet", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Vaccination.prototype, "administered_by_vet_id", void 0);
exports.Vaccination = Vaccination = __decorate([
    (0, typeorm_1.Entity)('vaccinations')
], Vaccination);
//# sourceMappingURL=vaccination.entity.js.map