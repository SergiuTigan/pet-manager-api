import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { RegistrationResponse } from './dto/registration-response.dto';
import { UserType } from '@/common/interfaces';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto): Promise<RegistrationResponse> {
    // Check if email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email.toLowerCase() }
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

    // Prepare user data
    const userData = {
      ...registerDto,
      email: registerDto.email.toLowerCase(),
      password: hashedPassword,
      type: registerDto.type || UserType.OWNER,
      preferences: registerDto.preferences || {
        notifications: {
          email: true,
          push: true,
          reminders: true,
        },
        language: 'ro',
      },
    };

    // Remove password from registerDto for logging
    const { password, ...safeUserData } = userData;

    try {
      // Create and save user
      const user = this.userRepository.create(userData);
      const savedUser = await this.userRepository.save(user) as User;

      // Remove sensitive information for response
      const { preferences, password: hashedPassword, ...safeUserData } = savedUser;
      const publicUserData = {
        id: safeUserData.id,
        email: safeUserData.email,
        name: safeUserData.name,
        phone: safeUserData.phone,
        type: safeUserData.type,
        avatar: safeUserData.avatar,
        created_at: safeUserData.created_at,
        last_login: safeUserData.last_login,
        clinic_name: safeUserData.clinic_name,
        clinic_address: safeUserData.clinic_address,
        license_number: safeUserData.license_number,
        specializations: safeUserData.specializations,
        working_hours: safeUserData.working_hours,
      };

      const userTypeMessage = savedUser.type === UserType.VETERINARIAN ? 'veterinarian' : 'pet owner';

      return {
        success: true,
        data: publicUserData,
        message: `${userTypeMessage} account created successfully`
      };
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique constraint error
        throw new ConflictException('Email already registered');
      }
      throw error;
    }
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    if (!email) return false;
    
    const existingUser = await this.userRepository.findOne({
      where: { email: email.toLowerCase() }
    });
    
    return !existingUser;
  }

  async validateRegistrationData(registerDto: RegisterDto): Promise<string[]> {
    const errors: string[] = [];

    // Check email availability
    if (!await this.isEmailAvailable(registerDto.email)) {
      errors.push('Email is already registered');
    }

    // Validate veterinarian-specific requirements
    if (registerDto.type === UserType.VETERINARIAN) {
      if (!registerDto.clinic_name) {
        errors.push('Clinic name is required for veterinarians');
      }
      if (!registerDto.clinic_address) {
        errors.push('Clinic address is required for veterinarians');
      }
      if (!registerDto.license_number) {
        errors.push('License number is required for veterinarians');
      }
    }

    return errors;
  }

  async getRegistrationStatistics() {
    const totalUsers = await this.userRepository.count();
    const ownersCount = await this.userRepository.count({ where: { type: UserType.OWNER } });
    const vetsCount = await this.userRepository.count({ where: { type: UserType.VETERINARIAN } });

    const recentRegistrations = await this.userRepository.count({
      where: {
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) as any // Last 7 days
      }
    });

    return {
      total_users: totalUsers,
      owners: ownersCount,
      veterinarians: vetsCount,
      recent_registrations_7_days: recentRegistrations,
      registration_rate: totalUsers > 0 ? Math.round((recentRegistrations / totalUsers) * 100) : 0,
    };
  }
}