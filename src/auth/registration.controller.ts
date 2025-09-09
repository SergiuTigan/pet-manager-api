import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RegistrationService } from './registration.service';
import { RegisterDto } from './dto/register.dto';
import { UserType } from '@/common/interfaces';

@ApiTags('registration')
@Controller('register')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post('owner')
  @ApiOperation({ 
    summary: '🏠 Register as Pet Owner',
    description: `
**Create a new pet owner account**

Register to manage your pets' health, vaccinations, and veterinary care.

Required information:
- **Name**: Your full name
- **Email**: Valid email address (will be used for login)
- **Phone**: Romanian phone number (+40XXXXXXXXX)
- **Password**: Secure password (min 8 chars, uppercase, lowercase, number)

Optional:
- **Preferences**: Notification settings and language preferences
    `
  })
  @ApiBody({
    type: RegisterDto,
    examples: {
      owner: {
        summary: '🏠 Pet Owner Registration',
        description: 'Complete registration for a pet owner',
        value: {
          name: 'Maria Popescu',
          email: 'maria.popescu@gmail.com',
          phone: '+40722123456',
          password: 'MySecurePass123!',
          preferences: {
            notifications: {
              email: true,
              push: true,
              reminders: true
            },
            language: 'ro'
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: '✅ Pet owner account created successfully',
    schema: {
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 3 },
            name: { type: 'string', example: 'Maria Popescu' },
            email: { type: 'string', example: 'maria.popescu@gmail.com' },
            phone: { type: 'string', example: '+40722123456' },
            type: { type: 'string', example: 'owner' },
            created_at: { type: 'string', example: '2025-09-03T12:15:00Z' }
          }
        },
        message: { type: 'string', example: 'Pet owner account created successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: 409, 
    description: '❌ Email already exists',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'Email already registered' },
        timestamp: { type: 'string' },
        path: { type: 'string' }
      }
    }
  })
  async registerOwner(@Body() registerDto: RegisterDto) {
    const userData = {
      ...registerDto,
      type: UserType.OWNER,
    };
    
    return this.registrationService.register(userData);
  }

  @Post('veterinarian')
  @ApiOperation({ 
    summary: '🏥 Register as Veterinarian',
    description: `
**Create a new veterinarian account**

Register to manage consultations, vaccinations, and provide veterinary services.

Required information:
- **Personal Details**: Name, email, phone, password
- **Professional Details**: Clinic name, address, license number
- **Optional**: Specializations and working hours
    `
  })
  @ApiBody({
    type: RegisterDto,
    examples: {
      veterinarian: {
        summary: '🏥 Veterinarian Registration',
        description: 'Complete registration for a veterinarian',
        value: {
          name: 'Dr. Ion Marinescu',
          email: 'ion.marinescu@veterinar.ro',
          phone: '+40721987654',
          password: 'VetSecure123!',
          type: 'veterinarian',
          clinic_name: 'Clinica Veterinară AnimalCare',
          clinic_address: 'Str. Sănătății nr. 45, București, Sector 2',
          license_number: 'VET-BUC-2024-001',
          specializations: ['Chirurgie', 'Oftalmologie', 'Cardiologie'],
          working_hours: {
            monday: '08:00-18:00',
            tuesday: '08:00-18:00',
            wednesday: '08:00-18:00',
            thursday: '08:00-18:00',
            friday: '08:00-18:00',
            saturday: '09:00-14:00',
            sunday: 'closed'
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: '✅ Veterinarian account created successfully' 
  })
  @ApiResponse({ 
    status: 400, 
    description: '❌ Missing required veterinarian information' 
  })
  async registerVeterinarian(@Body() registerDto: RegisterDto) {
    // Validate required veterinarian fields
    if (!registerDto.clinic_name || !registerDto.clinic_address || !registerDto.license_number) {
      throw new BadRequestException([
        'Veterinarians must provide clinic_name, clinic_address, and license_number'
      ]);
    }

    const userData = {
      ...registerDto,
      type: UserType.VETERINARIAN,
    };
    
    return this.registrationService.register(userData);
  }

  @Post('check-email')
  @ApiOperation({ 
    summary: '📧 Check Email Availability',
    description: 'Check if an email address is available for registration'
  })
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string', example: 'test@example.com' }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Email availability check completed',
    schema: {
      properties: {
        available: { type: 'boolean' },
        email: { type: 'string' },
        message: { type: 'string' }
      }
    }
  })
  async checkEmailAvailability(@Body('email') email: string) {
    const isAvailable = await this.registrationService.isEmailAvailable(email);
    
    return {
      available: isAvailable,
      email: email?.toLowerCase(),
      message: isAvailable ? 'Email is available' : 'Email is already registered'
    };
  }
}