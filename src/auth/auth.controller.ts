import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, DemoLoginDto, ApiResponseDto, LoginResponseDto } from '@/common/dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ 
    summary: 'Login with email and password',
    description: 'Authenticate user with email and password. Returns JWT token for API access.'
  })
  @ApiBody({ 
    type: LoginDto,
    examples: {
      owner: {
        summary: 'Pet Owner Login',
        value: {
          email: 'maria.popescu@email.com',
          password: 'password123'
        }
      },
      veterinarian: {
        summary: 'Veterinarian Login',
        value: {
          email: 'dr.radu.ionescu@vetclinic.ro',
          password: 'password123'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User logged in successfully',
    type: ApiResponseDto,
    schema: {
      properties: {
        success: { type: 'boolean', example: true },
        data: { $ref: '#/components/schemas/LoginResponseDto' },
        timestamp: { type: 'string', example: '2025-09-01T16:08:14.906Z' },
        path: { type: 'string', example: '/api/auth/login' },
        message: { type: 'string', example: 'User logged in successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Invalid credentials',
    schema: {
      properties: {
        success: { type: 'boolean', example: false },
        error: { type: 'string', example: 'Invalid credentials' },
        statusCode: { type: 'number', example: 401 },
        timestamp: { type: 'string', example: '2025-09-01T16:08:14.906Z' },
        path: { type: 'string', example: '/api/auth/login' }
      }
    }
  })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    
    return this.authService.login(user);
  }

  @Post('demo-login')
  @ApiOperation({ 
    summary: '🚀 Quick Demo Login (No Password Required)',
    description: `
**Perfect for testing!** Get instant access without creating accounts.

Choose between:
- **Owner**: Pet owner with access to their pets' health records
- **Veterinarian**: Vet with access to patient management and medical records

⚡ **Pro tip**: Use this endpoint first to get a JWT token, then click "Authorize" above to test protected endpoints!
    `
  })
  @ApiBody({ 
    type: DemoLoginDto,
    examples: {
      owner: {
        summary: '👤 Login as Pet Owner',
        description: 'Get access as Maria Popescu (pet owner)',
        value: { userType: 'owner' }
      },
      veterinarian: {
        summary: '👩‍⚕️ Login as Veterinarian',
        description: 'Get access as Dr. Radu Ionescu (veterinarian)',
        value: { userType: 'veterinarian' }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Demo user logged in successfully - Ready to test!',
    type: ApiResponseDto,
    schema: {
      properties: {
        success: { type: 'boolean', example: true },
        data: { $ref: '#/components/schemas/LoginResponseDto' },
        timestamp: { type: 'string', example: '2025-09-01T16:08:14.906Z' },
        path: { type: 'string', example: '/api/auth/demo-login' },
        message: { type: 'string', example: 'Demo login successful - Token ready for API testing!' }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid user type - must be "owner" or "veterinarian"',
    schema: {
      properties: {
        success: { type: 'boolean', example: false },
        error: { type: 'string', example: 'Invalid user type. Must be "owner" or "veterinarian".' },
        statusCode: { type: 'number', example: 400 },
        timestamp: { type: 'string', example: '2025-09-01T16:08:14.906Z' },
        path: { type: 'string', example: '/api/auth/demo-login' }
      }
    }
  })
  async demoLogin(@Body() demoDto: DemoLoginDto) {
    try {
      return await this.authService.loginDemo(demoDto.userType);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user (client-side token removal)' })
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  async logout() {
    return {
      message: 'Logged out successfully. Remove token from client storage.',
      timestamp: new Date().toISOString(),
    };
  }
}