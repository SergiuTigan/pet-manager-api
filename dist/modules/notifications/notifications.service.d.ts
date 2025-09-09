import { Repository } from 'typeorm';
import { Notification } from '@/entities/notification.entity';
import { NotificationType, NotificationPriority } from '@/common/interfaces';
export declare class NotificationsService {
    private notificationRepository;
    constructor(notificationRepository: Repository<Notification>);
    findAll(): Promise<Notification[]>;
    findOne(id: number): Promise<Notification | null>;
    findByUserId(userId: number): Promise<Notification[]>;
    findByPetId(petId: number): Promise<Notification[]>;
    findByType(type: NotificationType): Promise<Notification[]>;
    findByPriority(priority: NotificationPriority): Promise<Notification[]>;
    findByReadStatus(isRead: boolean): Promise<Notification[]>;
    getPendingNotifications(): Promise<Notification[]>;
    getStatistics(): Promise<{
        total: number;
        by_type: Record<string, number>;
        by_priority: Record<string, number>;
        read: number;
        unread: number;
        sent: number;
        pending: number;
        action_required: number;
        expired: number;
        created_today: number;
        read_rate: number;
    }>;
    sendPendingNotifications(): Promise<{
        sent: number;
        failed: number;
        results: any[];
    }>;
    markAsRead(id: number): Promise<Notification>;
    markAsUnread(id: number): Promise<Notification>;
    markAllAsReadForUser(userId: number): Promise<{
        updated: number;
    }>;
    create(createNotificationDto: any): Promise<Notification>;
    update(id: number, updateNotificationDto: any): Promise<Notification>;
    remove(id: number): Promise<void>;
    createVaccinationReminder(petId: number, userId: number, vaccinationData: any): Promise<Notification>;
    createAppointmentReminder(petId: number, userId: number, appointmentData: any): Promise<Notification>;
}
