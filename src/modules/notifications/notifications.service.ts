import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, IsNull } from 'typeorm';
import { Notification } from '@/entities/notification.entity';
import { NotificationType, NotificationPriority } from '@/common/interfaces';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async findAll(): Promise<Notification[]> {
    return this.notificationRepository.find({
      relations: ['user', 'pet'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Notification | null> {
    return this.notificationRepository.findOne({
      where: { id },
      relations: ['user', 'pet'],
    });
  }

  async findByUserId(userId: number): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { user_id: userId },
      relations: ['user', 'pet'],
      order: { created_at: 'DESC' },
    });
  }

  async findByPetId(petId: number): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { pet_id: petId },
      relations: ['user', 'pet'],
      order: { created_at: 'DESC' },
    });
  }

  async findByType(type: NotificationType): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { type },
      relations: ['user', 'pet'],
      order: { created_at: 'DESC' },
    });
  }

  async findByPriority(priority: NotificationPriority): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { priority },
      relations: ['user', 'pet'],
      order: { created_at: 'DESC' },
    });
  }

  async findByReadStatus(isRead: boolean): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { is_read: isRead },
      relations: ['user', 'pet'],
      order: { created_at: 'DESC' },
    });
  }

  async getPendingNotifications(): Promise<Notification[]> {
    const now = new Date();
    return this.notificationRepository.find({
      where: {
        scheduled_for: LessThanOrEqual(now),
        sent_at: IsNull(),
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
    }, {} as Record<string, number>);

    const priorityBreakdown = notifications.reduce((acc, notification) => {
      acc[notification.priority] = (acc[notification.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

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

  async sendPendingNotifications(): Promise<{ sent: number; failed: number; results: any[] }> {
    const pendingNotifications = await this.getPendingNotifications();
    const results = [];
    let sentCount = 0;
    let failedCount = 0;

    for (const notification of pendingNotifications) {
      try {
        // In a real implementation, this would send the notification via email, SMS, push, etc.
        // For now, we'll just mark it as sent
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
      } catch (error) {
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

  async markAsRead(id: number): Promise<Notification> {
    await this.notificationRepository.update(id, { is_read: true });
    return this.findOne(id);
  }

  async markAsUnread(id: number): Promise<Notification> {
    await this.notificationRepository.update(id, { is_read: false });
    return this.findOne(id);
  }

  async markAllAsReadForUser(userId: number): Promise<{ updated: number }> {
    const result = await this.notificationRepository.update(
      { user_id: userId, is_read: false },
      { is_read: true }
    );
    
    return { updated: result.affected || 0 };
  }

  async create(createNotificationDto: any): Promise<Notification> {
    const notification = this.notificationRepository.create({
      ...createNotificationDto,
      scheduled_for: createNotificationDto.scheduled_for || new Date(),
    });
    return (await this.notificationRepository.save(notification)) as unknown as Notification;
  }

  async update(id: number, updateNotificationDto: any): Promise<Notification> {
    await this.notificationRepository.update(id, updateNotificationDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.notificationRepository.delete(id);
  }

  // Helper method to create vaccination reminders
  async createVaccinationReminder(petId: number, userId: number, vaccinationData: any): Promise<Notification> {
    const notification = {
      user_id: userId,
      pet_id: petId,
      type: NotificationType.VACCINATION_REMINDER,
      title: 'Reminder Vaccinare',
      message: `Vaccinul ${vaccinationData.vaccine_name} pentru ${vaccinationData.pet_name} este programat pentru ${vaccinationData.due_date}`,
      priority: NotificationPriority.HIGH,
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

  // Helper method to create appointment reminders
  async createAppointmentReminder(petId: number, userId: number, appointmentData: any): Promise<Notification> {
    const notification = {
      user_id: userId,
      pet_id: petId,
      type: NotificationType.APPOINTMENT_REMINDER,
      title: 'Reminder Consultație',
      message: `Consultația pentru ${appointmentData.pet_name} este programată pentru ${appointmentData.appointment_date}`,
      priority: NotificationPriority.MEDIUM,
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
}