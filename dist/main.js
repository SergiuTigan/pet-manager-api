"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3999',
            'http://localhost:4200',
            'http://localhost:8100',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:3999',
            'http://127.0.0.1:4200',
            'http://127.0.0.1:8100',
            'https://api-pet.tigan.dev',
            'https://pet.tigan.dev',
            'http://pet.tigan.dev',
        ],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
        credentials: true,
        optionsSuccessStatus: 200,
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        disableErrorMessages: process.env.NODE_ENV === 'production',
    }));
    const config = new swagger_1.DocumentBuilder()
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
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter your JWT token (get one from /api/auth/demo-login)',
        in: 'header',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        operationIdFactory: (controllerKey, methodKey) => methodKey,
    });
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
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
    common_1.Logger.error('Failed to start application', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map