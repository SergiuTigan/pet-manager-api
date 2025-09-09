import { NotificationsService } from './notifications.service';
import { NotificationType, NotificationPriority } from '@/common/interfaces';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(userId?: string, petId?: string, type?: NotificationType, priority?: NotificationPriority, isRead?: string): Promise<import("../../entities").Notification[]>;
    getPendingNotifications(): Promise<import("../../entities").Notification[]>;
    getUrgentNotifications(): Promise<import("../../entities").Notification[]>;
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
    findOne(id: number): Promise<import("../../entities").Notification>;
    create(createNotificationDto: any): Promise<import("../../entities").Notification>;
    update(id: number, updateNotificationDto: any): Promise<import("../../entities").Notification>;
    remove(id: number): Promise<void>;
    markAsRead(id: number): Promise<import("../../entities").Notification>;
    markAsUnread(id: number): Promise<import("../../entities").Notification>;
    markAllAsRead(userId: number): Promise<{
        updated: number;
    }>;
    sendPendingNotifications(): Promise<{
        sent: number;
        failed: number;
        results: any[];
    }>;
}
