import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Security
  app.use(helmet());

  // CORS Configuration
  app.enableCors({
    origin: [
      'http://localhost:3000', // Angular dev server
      'http://localhost:3999', // API port
      'http://localhost:4200', // Alternative Angular port
      'http://localhost:8100', // Ionic dev server
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3999',
      'http://127.0.0.1:4200',
      'http://127.0.0.1:8100',
      'https://api-pet.tigan.dev', // Production API domain
      'https://pet.tigan.dev', // Production frontend domain
      'http://pet.tigan.dev', // Production frontend domain (HTTP)
      'https://pet-manager.tigan.dev', // Production frontend domain
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    credentials: true,
    optionsSuccessStatus: 200, // For legacy browser support
  });

  // Global API prefix
  app.setGlobalPrefix('api');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw error for non-whitelisted properties
      transform: true, // Transform payloads to DTO classes
      disableErrorMessages: process.env.NODE_ENV === 'production',
    }),
  );

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Pet Manager API')
    .setDescription(`
🐾 **Pet Manager API** - Complete REST API for pet health management

## Features
- 🏥 **Health Management**: Track vaccinations, consultations, and medical records  
- 👥 **User Management**: Support for pet owners and veterinarians
- 📱 **Mobile Ready**: Designed for web, mobile, and desktop applications
- 🔒 **Secure**: JWT authentication with role-based access
- 📊 **Analytics**: Statistics and reporting for health insights

## Getting Started
1. Use the **Demo Login** endpoint to get started quickly
2. All endpoints require authentication (except auth and system endpoints)
3. Use the **Authorize** button above to set your JWT token
4. Try the endpoints directly from this interface!

## Support
For issues or questions, contact the development team.
    `)
    .setVersion('1.0.0')
    .setContact('Pet Manager Team', 'https://github.com/pet-manager', 'support@petmanager.ro')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addTag('auth', '🔐 Authentication & Authorization')
    .addTag('system', '⚙️ System Health & Information') 
    .addTag('users', '👥 User Management')
    .addTag('pets', '🐾 Pet Management & Profiles')
    .addTag('vaccinations', '💉 Vaccination Tracking & Certificates')
    .addServer('http://localhost:3999', 'Development Server')
    .addServer('https://api-pet.tigan.dev', 'Production Server')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter your JWT token (get one from /api/auth/demo-login)',
        in: 'header',
      },
      'JWT-auth'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });
  
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Pet Manager API - Interactive Documentation',
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #10B981; font-size: 36px; }
      .swagger-ui .info .description { font-size: 14px; line-height: 1.6; }
      .swagger-ui .scheme-container { background: #F0FDF4; padding: 15px; border-radius: 8px; }
      .swagger-ui .btn.authorize { background-color: #10B981; border-color: #10B981; }
      .swagger-ui .btn.authorize:hover { background-color: #059669; border-color: #059669; }
      .swagger-ui .opblock.opblock-post { border-color: #10B981; }
      .swagger-ui .opblock.opblock-post .opblock-summary { border-color: #10B981; }
      .swagger-ui .opblock.opblock-get { border-color: #3B82F6; }
      .swagger-ui .opblock.opblock-get .opblock-summary { border-color: #3B82F6; }
      .swagger-ui .opblock.opblock-patch { border-color: #F59E0B; }
      .swagger-ui .opblock.opblock-patch .opblock-summary { border-color: #F59E0B; }
      .swagger-ui .opblock.opblock-delete { border-color: #EF4444; }
      .swagger-ui .opblock.opblock-delete .opblock-summary { border-color: #EF4444; }
      .swagger-ui .response-content-type { font-size: 12px; }
      .swagger-ui .execute-wrapper { text-align: center; padding: 20px; }
      .swagger-ui .btn.execute { background-color: #10B981; border: none; font-size: 16px; font-weight: bold; }
    `,
    customfavIcon: '🐾',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'list',
      filter: true,
      showExtensions: true,
      tryItOutEnabled: true,
      requestInterceptor: `(req) => {
        req.headers['Content-Type'] = 'application/json';
        return req;
      }`,
    },
  });

  const port = process.env.PORT || 3999;
  await app.listen(port);

  logger.log(`🐾 Pet Manager API is running on: http://localhost:${port}`);
  logger.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
  logger.log(`🏥 Health Check: http://localhost:${port}/api/health`);
  logger.log(`📊 Statistics: http://localhost:${port}/api/statistics`);
  logger.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap().catch((error) => {
  Logger.error('Failed to start application', error);
  process.exit(1);
});