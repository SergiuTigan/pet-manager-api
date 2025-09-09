import { UserType } from '@/common/interfaces';
export declare class RegisterDto {
    name: string;
    email: string;
    phone: string;
    password: string;
    type?: UserType;
    clinic_name?: string;
    clinic_address?: string;
    license_number?: string;
    specializations?: string[];
    working_hours?: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };
    preferences?: {
        notifications: {
            email: boolean;
            push: boolean;
            reminders: boolean;
        };
        language: string;
    };
}
