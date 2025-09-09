"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("../../entities/notification.entity");
const interfaces_1 = require("../../common/interfaces");
let NotificationsService = class NotificationsService {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async findAll() {
        return this.notificationRepository.find({
            relations: ['user', 'pet'],
            order: { created_at: 'DESC' },
        });
    }
    async findOne(id) {
        return this.notificationRepository.findOne({
            where: { id },
            relations: ['user', 'pet'],
        });
    }
    async findByUserId(userId) {
        return this.notificationRepository.find({
            where: { user_id: userId },
            relations: ['user', 'pet'],
            order: { created_at: 'DESC' },
        });
    }
    async findByPetId(petId) {
        return this.notificationRepository.find({
            where: { pet_id: petId },
            relations: ['user', 'pet'],
            order: { created_at: 'DESC' },
        });
    }
    async findByType(type) {
        return this.notificationRepository.find({
            where: { type },
            relations: ['user', 'pet'],
            order: { created_at: 'DESC' },
        });
    }
    async findByPriority(priority) {
        return this.notificationRepository.find({
            where: { priority },
            relations: ['user', 'pet'],
            order: { created_at: 'DESC' },
        });
    }
    async findByReadStatus(isRead) {
        return this.notificationRepository.find({
            where: { is_read: isRead },
            relations: ['user', 'pet'],
            order: { created_at: 'DESC' },
        });
    }
    async getPendingNotifications() {
        const now = new Date();
        return this.notificationRepository.find({
            where: {
                scheduled_for: (0, typeorm_2.LessThanOrEqual)(now),
                sent_at: (0, typeorm_2.IsNull)(),
            },
            relations: ['user', 'pet'],
            order: { scheduled_for: 'ASC' },
        });
    }
    async getStatistics() {
        const notifications = await this.findAll();
        const typeBreakdown = notifications.reduce((acc, notification) => {
            acc[notification.type] = (acc[notification.type] || 0) + 1;
            return acc;
        }, {});
        const priorityBreakdown = notifications.reduce((acc, notification) => {
            acc[notification.priority] = (acc[notification.priority] || 0) + 1;
            return acc;
        }, {});
        const readNotifications = notifications.filter(n => n.is_read).length;
        const unreadNotifications = notifications.filter(n => !n.is_read).length;
        const sentNotifications = notifications.filter(n => n.sent_at).length;
        const pendingCount = (await this.getPendingNotifications()).length;
        const actionRequiredCount = notifications.filter(n => n.action_required).length;
        const expiredCount = notifications.filter(n => {
            return n.expires_at && new Date(n.expires_at) < new Date();
        }).length;
        const todaysNotifications = notifications.filter(n => {
            const today = new Date().toDateString();
            const notificationDate = new Date(n.created_at).toDateString();
            return today === notificationDate;
        }).length;
        return {
            total: notifications.length,
            by_type: typeBreakdown,
            by_priority: priorityBreakdown,
            read: readNotifications,
            unread: unreadNotifications,
            sent: sentNotifications,
            pending: pendingCount,
            action_required: actionRequiredCount,
            expired: expiredCount,
            created_today: todaysNotifications,
            read_rate: notifications.length > 0 ? Math.round((readNotifications / notifications.length) * 100) : 0,
        };
    }
    async sendPendingNotifications() {
        const pendingNotifications = await this.getPendingNotifications();
        const results = [];
        let sentCount = 0;
        let failedCount = 0;
        for (const notification of pendingNotifications) {
            try {
                await this.notificationRepository.update(notification.id, {
                    sent_at: new Date(),
                });
                results.push({
                    id: notification.id,
                    status: 'sent',
                    type: notification.type,
                    user_id: notification.user_id,
                });
                sentCount++;
            }
            catch (error) {
                results.push({
                    id: notification.id,
                    status: 'failed',
                    error: error.message,
                });
                failedCount++;
            }
        }
        return {
            sent: sentCount,
            failed: failedCount,
            results,
        };
    }
    async markAsRead(id) {
        await this.notificationRepository.update(id, { is_read: true });
        return this.findOne(id);
    }
    async markAsUnread(id) {
        await this.notificationRepository.update(id, { is_read: false });
        return this.findOne(id);
    }
    async markAllAsReadForUser(userId) {
        const result = await this.notificationRepository.update({ user_id: userId, is_read: false }, { is_read: true });
        return { updated: result.affected || 0 };
    }
    async create(createNotificationDto) {
        const notification = this.notificationRepository.create({
            ...createNotificationDto,
            scheduled_for: createNotificationDto.scheduled_for || new Date(),
        });
        return (await this.notificationRepository.save(notification));
    }
    async update(id, updateNotificationDto) {
        await this.notificationRepository.update(id, updateNotificationDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.notificationRepository.delete(id);
    }
    async createVaccinationReminder(petId, userId, vaccinationData) {
        const notification = {
            user_id: userId,
            pet_id: petId,
            type: interfaces_1.NotificationType.VACCINATION_REMINDER,
            title: 'Reminder Vaccinare',
            message: `Vaccinul ${vaccinationData.vaccine_name} pentru ${vaccinationData.pet_name} este programat pentru ${vaccinationData.due_date}`,
            priority: interfaces_1.NotificationPriority.HIGH,
            action_required: true,
            scheduled_for: new Date(vaccinationData.reminder_date),
            metadata: {
                vaccination_id: vaccinationData.vaccination_id,
                vaccine_type: vaccinationData.vaccine_name,
                pet_name: vaccinationData.pet_name,
                days_until_due: vaccinationData.days_until_due,
            },
        };
        return this.create(notification);
    }
    async createAppointmentReminder(petId, userId, appointmentData) {
        const notification = {
            user_id: userId,
            pet_id: petId,
            type: interfaces_1.NotificationType.APPOINTMENT_REMINDER,
            title: 'Reminder Consultație',
            message: `Consultația pentru ${appointmentData.pet_name} este programată pentru ${appointmentData.appointment_date}`,
            priority: interfaces_1.NotificationPriority.MEDIUM,
            action_required: true,
            scheduled_for: new Date(appointmentData.reminder_date),
            metadata: {
                appointment_id: appointmentData.consultation_id,
                pet_name: appointmentData.pet_name,
                vet_name: appointmentData.vet_name,
                appointment_type: appointmentData.consultation_type,
            },
        };
        return this.create(notification);
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map