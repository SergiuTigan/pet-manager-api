import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { SeederService } from './database/seeder.service';
import { HealthResponseDto } from './common/dto';

@ApiTags('system')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly seederService: SeederService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get API welcome message' })
  @ApiResponse({ status: 200, description: 'Welcome message retrieved successfully' })
  getWelcome(): object {
    return this.appService.getWelcome();
  }

  @Get('health')
  @ApiOperation({ 
    summary: '🏥 API Health Check',
    description: 'Check if the API is running properly. Returns server status, memory usage, database connectivity, and system information.'
  })
  @ApiResponse({ 
    status: 200, 
    description: '✅ API is healthy and running',
    type: HealthResponseDto,
    schema: {
      properties: {
        success: { type: 'boolean', example: true },
        data: { $ref: '#/components/schemas/HealthResponseDto' },
        timestamp: { type: 'string', example: '2025-09-01T16:08:03.879Z' },
        path: { type: 'string', example: '/api/health' },
        message: { type: 'string', example: 'Health check completed successfully' }
      }
    }
  })
  getHealth(): object {
    return this.appService.getHealth();
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get comprehensive system statistics' })
  @ApiResponse({ status: 200, description: 'System statistics retrieved successfully' })
  getStatistics(): object {
    return this.appService.getStatistics();
  }

  @Get('version')
  @ApiOperation({ summary: 'Get API version information' })
  @ApiResponse({ status: 200, description: 'Version information retrieved successfully' })
  getVersion(): object {
    return this.appService.getVersion();
  }

  @Post('seed-database')
  @ApiOperation({ summary: 'Seed database with mock data' })
  @ApiResponse({ status: 200, description: 'Database seeded successfully' })
  async seedDatabase(): Promise<object> {
    try {
      await this.seederService.seedDatabase();
      return {
        success: true,
        message: 'Database seeded successfully with Romanian pet management data',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        message: 'Database seeding failed: ' + error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Post('clear-database')
  @ApiOperation({ summary: 'Clear all database data' })
  @ApiResponse({ status: 200, description: 'Database cleared successfully' })
  async clearDatabase(): Promise<object> {
    try {
      await this.seederService.clearDatabase();
      return {
        success: true,
        message: 'Database cleared successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        message: 'Database clearing failed: ' + error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}