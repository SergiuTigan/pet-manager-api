import { AuthService } from './auth.service';
import { LoginDto, DemoLoginDto } from '@/common/dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: any;
        user: {
            clinic_name: any;
            clinic_address: any;
            license_number: any;
            specializations: any;
            working_hours: any;
            id: any;
            email: any;
            name: any;
            phone: any;
            type: any;
            avatar: any;
            created_at: any;
            last_login: any;
        };
        expires_in: string;
    }>;
    demoLogin(demoDto: DemoLoginDto): Promise<{
        access_token: any;
        user: {
            clinic_name: any;
            clinic_address: any;
            license_number: any;
            specializations: any;
            working_hours: any;
            id: any;
            email: any;
            name: any;
            phone: any;
            type: any;
            avatar: any;
            created_at: any;
            last_login: any;
        };
        expires_in: string;
    }>;
    logout(): Promise<{
        message: string;
        timestamp: string;
    }>;
}
