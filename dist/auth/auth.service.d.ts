import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
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
    loginDemo(userType: 'owner' | 'veterinarian'): Promise<{
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
    hashPassword(password: string): Promise<string>;
}
