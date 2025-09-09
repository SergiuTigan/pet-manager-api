"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const user_entity_1 = require("../entities/user.entity");
const pet_entity_1 = require("../entities/pet.entity");
const vaccination_entity_1 = require("../entities/vaccination.entity");
const consultation_entity_1 = require("../entities/consultation.entity");
const document_entity_1 = require("../entities/document.entity");
const feeding_schedule_entity_1 = require("../entities/feeding-schedule.entity");
const notification_entity_1 = require("../entities/notification.entity");
exports.databaseConfig = {
    type: 'postgres',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'petmanager',
    password: process.env.DB_PASSWORD || 'petmanager123',
    database: process.env.DB_NAME || 'petmanager',
    entities: [user_entity_1.User, pet_entity_1.Pet, vaccination_entity_1.Vaccination, consultation_entity_1.Consultation, document_entity_1.Document, feeding_schedule_entity_1.FeedingSchedule, notification_entity_1.Notification],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    extra: {
        timezone: 'UTC',
    },
};
//# sourceMappingURL=database.config.js.map