import { IsString, IsNumber, IsEnum, IsOptional, IsBoolean, IsArray, IsDateString, ValidateNested, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { PetSpecies, PetGender } from '../interfaces/pet.interface';
import { EmergencyContactDto } from './emergency-contact.dto';

export class CreatePetDto {
  @ApiProperty({ description: 'Owner ID', example: 1 })
  @Transform(({ value }) => {
    if (value === null || value === undefined) return undefined;
    if (typeof value === 'string') {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? undefined : parsed;
    }
    if (typeof value === 'number') return value;
    return undefined;
  })
  @IsNumber({}, { message: 'owner_id must be a valid number' })
  owner_id: number;

  @ApiProperty({ description: 'Pet name', example: 'Max' })
  @IsString()
  name: string;

  @ApiProperty({ enum: PetSpecies, description: 'Pet species' })
  @IsEnum(PetSpecies)
  species: PetSpecies;

  @ApiProperty({ description: 'Pet breed', example: 'Golden Retriever' })
  @IsString()
  breed: string;

  @ApiProperty({ enum: PetGender, description: 'Pet gender' })
  @IsEnum(PetGender)
  gender: PetGender;

  @ApiPropertyOptional({ description: 'Pet birth date', example: '2021-03-12' })
  @IsOptional()
  @IsDateString()
  birth_date?: string;

  @ApiPropertyOptional({ description: 'Pet weight in kg', example: 32.5 })
  @IsOptional()
  @Transform(({ value }) => {
    if (value && typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? value : parsed;
    }
    return value;
  })
  @IsNumber({}, { message: 'weight must be a valid number' })
  weight?: number;

  @ApiPropertyOptional({ description: 'Microchip number', example: 'RO642123456789012' })
  @IsOptional()
  @IsString()
  microchip?: string;

  @ApiPropertyOptional({ description: 'Pet color', example: 'Auriu' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ description: 'Photo URL' })
  @IsOptional()
  @IsString()
  photo_url?: string;

  @ApiPropertyOptional({ description: 'Is pet neutered/spayed', default: false })
  @IsOptional()
  @IsBoolean()
  is_neutered?: boolean;

  @ApiPropertyOptional({ description: 'Medical conditions', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  medical_conditions?: string[];

  @ApiPropertyOptional({ description: 'Known allergies', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allergies?: string[];

  @ApiPropertyOptional({ description: 'Additional notes' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ 
    description: 'Emergency contact information',
    type: EmergencyContactDto
  })
  @ValidateNested()
  @Type(() => EmergencyContactDto)
  emergency_contact: EmergencyContactDto;
}