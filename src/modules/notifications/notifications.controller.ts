import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { NotificationType, NotificationPriority } from '@/common/interfaces';

@ApiTags('notifications')
@ApiBearerAuth('JWT-auth')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiQuery({ name: 'userId', required: false, description: 'Filter by user ID' })
  @ApiQuery({ name: 'petId', required: false, description: 'Filter by pet ID' })
  @ApiQuery({ name: 'type', required: false, enum: NotificationType, description: 'Filter by notification type' })
  @ApiQuery({ name: 'priority', required: false, enum: NotificationPriority, description: 'Filter by priority' })
  @ApiQuery({ name: 'isRead', required: false, description: 'Filter by read status' })
  @ApiResponse({ status: 200, description: 'List of notifications retrieved successfully' })
  async findAll(
    @Query('userId') userId?: string,
    @Query('petId') petId?: string,
    @Query('type') type?: NotificationType,
    @Query('priority') priority?: NotificationPriority,
    @Query('isRead') isRead?: string,
  ) {
    if (userId) {
      return this.notificationsService.findByUserId(parseInt(userId));
    }
    
    if (petId) {
      return this.notificationsService.findByPetId(parseInt(petId));
    }
    
    if (type) {
      return this.notificationsService.findByType(type);
    }

    if (priority) {
      return this.notificationsService.findByPriority(priority);
    }

    if (isRead !== undefined) {
      return this.notificationsService.findByReadStatus(isRead === 'true');
    }

    return this.notificationsService.findAll();
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get pending notifications (scheduled but not sent)' })
  @ApiResponse({ status: 200, description: 'Pending notifications retrieved successfully' })
  getPendingNotifications() {
    return this.notificationsService.getPendingNotifications();
  }

  @Get('urgent')
  @ApiOperation({ summary: 'Get urgent notifications' })
  @ApiResponse({ status: 200, description: 'Urgent notifications retrieved successfully' })
  getUrgentNotifications() {
    return this.notificationsService.findByPriority(NotificationPriority.URGENT);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get notification statistics' })
  @ApiResponse({ status: 200, description: 'Notification statistics retrieved successfully' })
  getStatistics() {
    return this.notificationsService.getStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification by ID' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({ status: 200, description: 'Notification retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const notification = await this.notificationsService.findOne(id);
    if (!notification) {
      throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
    }
    return notification;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiResponse({ status: 201, description: 'Notification created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createNotificationDto: any) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a notification' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({ status: 200, description: 'Notification updated successfully' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateNotificationDto: any) {
    const existingNotification = await this.findOne(id);
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({ status: 200, description: 'Notification deleted successfully' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const existingNotification = await this.findOne(id);
    return this.notificationsService.remove(id);
  }

  @Patch(':id/mark-read')
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({ status: 200, description: 'Notification marked as read successfully' })
  async markAsRead(@Param('id', ParseIntPipe) id: number) {
    return this.notificationsService.markAsRead(id);
  }

  @Patch(':id/mark-unread')
  @ApiOperation({ summary: 'Mark notification as unread' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({ status: 200, description: 'Notification marked as unread successfully' })
  async markAsUnread(@Param('id', ParseIntPipe) id: number) {
    return this.notificationsService.markAsUnread(id);
  }

  @Post('mark-all-read/:userId')
  @ApiOperation({ summary: 'Mark all notifications as read for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'All notifications marked as read successfully' })
  async markAllAsRead(@Param('userId', ParseIntPipe) userId: number) {
    return this.notificationsService.markAllAsReadForUser(userId);
  }

  @Post('send-pending')
  @ApiOperation({ summary: 'Send all pending notifications that are due' })
  @ApiResponse({ status: 200, description: 'Pending notifications sent successfully' })
  async sendPendingNotifications() {
    return this.notificationsService.sendPendingNotifications();
  }
}