import { IsString, IsEmail, IsEnum, IsOptional, IsArray, IsObject, ValidateNested, MinLength, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { UserType } from '@/common/interfaces';

export class RegisterDto {
  @ApiProperty({ description: 'Full name', example: 'Maria Popescu' })
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @ApiProperty({ description: 'Email address', example: 'maria@example.com' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @Transform(({ value }) => value?.toLowerCase())
  email: string;

  @ApiProperty({ description: 'Phone number', example: '+40722123456' })
  @IsString()
  @Matches(/^\+40\d{9}$/, { message: 'Phone number must be in format +40XXXXXXXXX' })
  phone: string;

  @ApiProperty({ description: 'Password', example: 'MySecurePassword123!' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, { 
    message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number' 
  })
  password: string;

  @ApiPropertyOptional({ 
    enum: UserType, 
    description: 'User type',
    default: UserType.OWNER,
    example: 'owner' 
  })
  @IsOptional()
  @IsEnum(UserType)
  type?: UserType;

  // Veterinarian-specific fields
  @ApiPropertyOptional({ description: 'Clinic name (required for veterinarians)' })
  @IsOptional()
  @IsString()
  clinic_name?: string;

  @ApiPropertyOptional({ description: 'Clinic address (required for veterinarians)' })
  @IsOptional()
  @IsString()
  clinic_address?: string;

  @ApiPropertyOptional({ description: 'License number (required for veterinarians)' })
  @IsOptional()
  @IsString()
  license_number?: string;

  @ApiPropertyOptional({ 
    description: 'Medical specializations',
    type: [String],
    example: ['Chirurgie', 'Dermatologie']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  specializations?: string[];

  @ApiPropertyOptional({
    description: 'Working hours',
    example: {
      monday: '09:00-17:00',
      tuesday: '09:00-17:00', 
      wednesday: '09:00-17:00',
      thursday: '09:00-17:00',
      friday: '09:00-17:00',
      saturday: '09:00-14:00',
      sunday: 'closed'
    }
  })
  @IsOptional()
  @IsObject()
  working_hours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };

  @ApiPropertyOptional({
    description: 'User preferences',
    example: {
      notifications: { email: true, push: true, reminders: true },
      language: 'ro'
    }
  })
  @IsOptional()
  @IsObject()
  preferences?: {
    notifications: {
      email: boolean;
      push: boolean;
      reminders: boolean;
    };
    language: string;
  };
}