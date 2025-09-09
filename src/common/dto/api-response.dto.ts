import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({ description: 'Indicates if the request was successful', example: true })
  success: boolean;

  @ApiProperty({ description: 'Response data' })
  data: T;

  @ApiProperty({ description: 'Response timestamp', example: '2025-09-01T16:08:03.879Z' })
  timestamp: string;

  @ApiProperty({ description: 'API endpoint path', example: '/api/pets' })
  path: string;

  @ApiProperty({ description: 'Response message', example: 'Operation completed successfully' })
  message: string;
}

export class LoginResponseDto {
  @ApiProperty({ 
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  access_token: string;

  @ApiProperty({ 
    description: 'User information',
    example: {
      id: 1,
      email: 'maria.popescu@email.com',
      name: 'Maria Popescu',
      type: 'owner',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b123?w=150'
    }
  })
  user: {
    id: number;
    email: string;
    name: string;
    type: string;
    avatar: string;
  };

  @ApiProperty({ description: 'Token expiration time', example: '24h' })
  expires_in: string;
}

export class HealthResponseDto {
  @ApiProperty({ description: 'Health status', example: 'healthy' })
  status: string;

  @ApiProperty({ description: 'Server timestamp', example: '2025-09-01T16:08:03.879Z' })
  timestamp: string;

  @ApiProperty({ description: 'Environment', example: 'development' })
  environment: string;

  @ApiProperty({ description: 'API version', example: '1.0.0' })
  version: string;

  @ApiProperty({ description: 'Server uptime in seconds', example: 17.64989575 })
  uptime: number;

  @ApiProperty({ 
    description: 'Memory usage information',
    example: { used: 37, total: 40, unit: 'MB' }
  })
  memory: {
    used: number;
    total: number;
    unit: string;
  };

  @ApiProperty({ 
    description: 'System information',
    example: {
      platform: 'darwin',
      arch: 'arm64',
      node_version: 'v20.19.0'
    }
  })
  system: {
    platform: string;
    arch: string;
    node_version: string;
  };

  @ApiProperty({ 
    description: 'Database connection status',
    example: {
      status: 'connected',
      type: 'mock_json',
      location: '../mock-data/'
    }
  })
  database: {
    status: string;
    type: string;
    location: string;
  };

  @ApiProperty({ description: 'Response time', example: '0.00ms' })
  response_time: string;
}