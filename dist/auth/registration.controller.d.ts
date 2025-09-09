import { RegistrationService } from './registration.service';
import { RegisterDto } from './dto/register.dto';
export declare class RegistrationController {
    private readonly registrationService;
    constructor(registrationService: RegistrationService);
    registerOwner(registerDto: RegisterDto): Promise<import("./dto/registration-response.dto").RegistrationResponse>;
    registerVeterinarian(registerDto: RegisterDto): Promise<import("./dto/registration-response.dto").RegistrationResponse>;
    checkEmailAvailability(email: string): Promise<{
        available: boolean;
        email: string;
        message: string;
    }>;
}
