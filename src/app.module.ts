import { Module } from '@nestjs/common';
import { APP_PIPE, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';

// Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PetsModule } from './modules/pets/pets.module';
import { VaccinationsModule } from './modules/vaccinations/vaccinations.module';
import { ConsultationsModule } from './modules/consultations/consultations.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { FeedingSchedulesModule } from './modules/feeding-schedules/feeding-schedules.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

// Entities
import { User, Pet, Vaccination, Consultation, Document, FeedingSchedule, Notification } from './entities';

// Services
import { SeederService } from './database/seeder.service';

// Filters and Interceptors
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

// Controllers
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Database
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([User, Pet, Vaccination, Consultation, Document, FeedingSchedule, Notification]),
    
    // Rate limiting
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 10,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    
    // Feature modules
    AuthModule,
    UsersModule,
    PetsModule,
    VaccinationsModule,
    ConsultationsModule,
    DocumentsModule,
    FeedingSchedulesModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SeederService,
    
    // Global validation pipe
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        exceptionFactory: (errors) => {
          const messages = errors.map(error => {
            const constraints = error.constraints;
            return constraints ? Object.values(constraints).join(', ') : error.property;
          });
          return new (require('@nestjs/common').BadRequestException)(messages);
        },
      }),
    },
    
    // Global exception filter
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    
    // Global interceptors
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    
    // Global rate limiting guard
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}