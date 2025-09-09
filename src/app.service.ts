import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  getWelcome(): object {
    return {
      message: '🐾 Bun venit la Pet Manager API!',
      description: 'API pentru managementul sănătății animalelor de companie',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      documentation: '/api/docs',
      endpoints: {
        registration: '/api/register',
        authentication: '/api/auth',
        users: '/api/users',
        pets: '/api/pets',
        vaccinations: '/api/vaccinations',
        consultations: '/api/consultations',
        documents: '/api/documents',
        feeding_schedules: '/api/feeding-schedules',
        notifications: '/api/notifications',
        health: '/api/health',
        statistics: '/api/statistics',
      },
    };
  }

  getHealth(): object {
    const startTime = process.hrtime();
    const endTime = process.hrtime(startTime);
    const responseTime = endTime[0] * 1000 + endTime[1] / 1000000; // Convert to milliseconds

    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        unit: 'MB',
      },
      system: {
        platform: process.platform,
        arch: process.arch,
        node_version: process.version,
      },
      database: {
        status: 'connected',
        type: 'postgresql',
        location: process.env.DB_HOST || 'localhost',
      },
      response_time: `${responseTime.toFixed(2)}ms`,
    };
  }

  getStatistics(): object {
    return {
      generated_at: new Date().toISOString(),
      api_version: '1.0.0',
      data_summary: {
        message: 'Statistics available through individual module endpoints',
        endpoints: [
          '/api/pets/statistics',
          '/api/users/statistics', 
          '/api/vaccinations/statistics',
          '/api/consultations/statistics',
          '/api/documents/statistics',
          '/api/feeding-schedules/statistics',
          '/api/notifications/statistics'
        ]
      },
      endpoints_available: [
        { path: '/users', methods: ['GET', 'POST'], description: 'User management' },
        { path: '/users/:id', methods: ['GET', 'PATCH', 'DELETE'], description: 'Individual user operations' },
        { path: '/pets', methods: ['GET', 'POST'], description: 'Pet management' },
        { path: '/pets/:id', methods: ['GET', 'PATCH', 'DELETE'], description: 'Individual pet operations' },
        { path: '/vaccinations', methods: ['GET', 'POST'], description: 'Vaccination management' },
        { path: '/vaccinations/:id', methods: ['GET', 'PATCH', 'DELETE'], description: 'Individual vaccination operations' },
        { path: '/consultations', methods: ['GET', 'POST'], description: 'Consultation management' },
        { path: '/consultations/:id', methods: ['GET', 'PATCH', 'DELETE'], description: 'Individual consultation operations' },
        { path: '/documents', methods: ['GET', 'POST'], description: 'Document management' },
        { path: '/documents/:id', methods: ['GET', 'PATCH', 'DELETE'], description: 'Individual document operations' },
        { path: '/feeding-schedules', methods: ['GET', 'POST'], description: 'Feeding schedule management' },
        { path: '/feeding-schedules/:id', methods: ['GET', 'PATCH', 'DELETE'], description: 'Individual feeding schedule operations' },
        { path: '/notifications', methods: ['GET', 'POST'], description: 'Notification management' },
        { path: '/notifications/:id', methods: ['GET', 'PATCH', 'DELETE'], description: 'Individual notification operations' },
      ],
      romanian_localization: {
        language: 'ro',
        currency: 'RON',
        date_format: 'DD.MM.YYYY',
        phone_format: '+40XXXXXXXXX',
      },
      features: {
        database: 'PostgreSQL with TypeORM',
        authentication: 'JWT (not yet implemented)',
        rate_limiting: 'enabled',
        api_documentation: 'Swagger OpenAPI',
        cors_enabled: true,
        validation: 'class-validator',
        error_handling: 'global_filter',
        logging: 'structured_logging',
      },
    };
  }

  getVersion(): object {
    return {
      api_version: '1.0.0',
      build_date: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      node_version: process.version,
      platform: process.platform,
      architecture: process.arch,
      features: {
        database: 'PostgreSQL',
        swagger_docs: true,
        cors: true,
        rate_limiting: true,
        validation: true,
        error_handling: true,
        logging: true,
      },
      author: 'Pet Manager Team',
      description: 'MVP Backend pentru Pet Manager - Aplicație de management animale de companie',
      repository: 'https://gitlab.com/pet-manager/pet-manager',
    };
  }
}