import { UsersService } from './users.service';
import { UserType } from '@/common/interfaces';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(type?: UserType, search?: string): Promise<Omit<import("../../entities").User, "preferences">[]>;
    getOwners(): Promise<Omit<import("../../entities").User, "preferences">[]>;
    getVeterinarians(): Promise<Omit<import("../../entities").User, "preferences">[]>;
    getStatistics(): Promise<{
        total_users: any;
        owners: {
            count: any;
            with_multiple_pets: number;
        };
        veterinarians: {
            count: any;
            specializations: any;
            with_working_hours: any;
        };
        activity: {
            recent_logins: any;
            active_percentage: number;
        };
    }>;
    findOne(id: number): Promise<Omit<import("../../entities").User, "preferences">>;
    getUserPets(id: number): Promise<any>;
    getUserNotifications(id: number, unread?: string): Promise<any>;
    getDashboardData(id: number): Promise<{
        user: Omit<import("../../entities").User, "preferences">;
        pets_count: any;
        active_pets: any;
        unread_notifications: any;
        upcoming_consultations: any;
        recent_consultations: any;
        pets: any;
        urgent_notifications: any;
    }>;
    getVetConsultations(id: number, status?: string): Promise<any>;
    getVetVaccinations(id: number): Promise<any>;
    create(createUserDto: any): Promise<import("../../entities").User>;
    update(id: number, updateUserDto: any): Promise<import("../../entities").User>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
