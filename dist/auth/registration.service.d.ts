import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { RegistrationResponse } from './dto/registration-response.dto';
export declare class RegistrationService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    register(registerDto: RegisterDto): Promise<RegistrationResponse>;
    isEmailAvailable(email: string): Promise<boolean>;
    validateRegistrationData(registerDto: RegisterDto): Promise<string[]>;
    getRegistrationStatistics(): Promise<{
        total_users: any;
        owners: any;
        veterinarians: any;
        recent_registrations_7_days: any;
        registration_rate: number;
    }>;
}
