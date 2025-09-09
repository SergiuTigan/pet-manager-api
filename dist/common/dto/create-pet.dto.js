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
exports.CreatePetDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const pet_interface_1 = require("../interfaces/pet.interface");
const emergency_contact_dto_1 = require("./emergency-contact.dto");
class CreatePetDto {
}
exports.CreatePetDto = CreatePetDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Owner ID', example: 1 }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return undefined;
        if (typeof value === 'string') {
            const parsed = parseInt(value, 10);
            return isNaN(parsed) ? undefined : parsed;
        }
        if (typeof value === 'number')
            return value;
        return undefined;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'owner_id must be a valid number' }),
    __metadata("design:type", Number)
], CreatePetDto.prototype, "owner_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Pet name', example: 'Max' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePetDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: pet_interface_1.PetSpecies, description: 'Pet species' }),
    (0, class_validator_1.IsEnum)(pet_interface_1.PetSpecies),
    __metadata("design:type", String)
], CreatePetDto.prototype, "species", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Pet breed', example: 'Golden Retriever' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePetDto.prototype, "breed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: pet_interface_1.PetGender, description: 'Pet gender' }),
    (0, class_validator_1.IsEnum)(pet_interface_1.PetGender),
    __metadata("design:type", String)
], CreatePetDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Pet birth date', example: '2021-03-12' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePetDto.prototype, "birth_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Pet weight in kg', example: 32.5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value && typeof value === 'string') {
            const parsed = parseFloat(value);
            return isNaN(parsed) ? value : parsed;
        }
        return value;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'weight must be a valid number' }),
    __metadata("design:type", Number)
], CreatePetDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Microchip number', example: 'RO642123456789012' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePetDto.prototype, "microchip", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Pet color', example: 'Auriu' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePetDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Photo URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePetDto.prototype, "photo_url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Is pet neutered/spayed', default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePetDto.prototype, "is_neutered", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Medical conditions', type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreatePetDto.prototype, "medical_conditions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Known allergies', type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreatePetDto.prototype, "allergies", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional notes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePetDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Emergency contact information',
        type: emergency_contact_dto_1.EmergencyContactDto
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => emergency_contact_dto_1.EmergencyContactDto),
    __metadata("design:type", emergency_contact_dto_1.EmergencyContactDto)
], CreatePetDto.prototype, "emergency_contact", void 0);
//# sourceMappingURL=create-pet.dto.js.map