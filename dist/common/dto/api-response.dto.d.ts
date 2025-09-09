export declare class ApiResponseDto<T> {
    success: boolean;
    data: T;
    timestamp: string;
    path: string;
    message: string;
}
export declare class LoginResponseDto {
    access_token: string;
    user: {
        id: number;
        email: string;
        name: string;
        type: string;
        avatar: string;
    };
    expires_in: string;
}
export declare class HealthResponseDto {
    status: string;
    timestamp: string;
    environment: string;
    version: string;
    uptime: number;
    memory: {
        used: number;
        total: number;
        unit: string;
    };
    system: {
        platform: string;
        arch: string;
        node_version: string;
    };
    database: {
        status: string;
        type: string;
        location: string;
    };
    response_time: string;
}
