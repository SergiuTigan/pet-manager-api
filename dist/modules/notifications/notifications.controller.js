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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const notifications_service_1 = require("./notifications.service");
const interfaces_1 = require("../../common/interfaces");
let NotificationsController = class NotificationsController {
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    async findAll(userId, petId, type, priority, isRead) {
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
    getPendingNotifications() {
        return this.notificationsService.getPendingNotifications();
    }
    getUrgentNotifications() {
        return this.notificationsService.findByPriority(interfaces_1.NotificationPriority.URGENT);
    }
    getStatistics() {
        return this.notificationsService.getStatistics();
    }
    async findOne(id) {
        const notification = await this.notificationsService.findOne(id);
        if (!notification) {
            throw new common_1.HttpException('Notification not found', common_1.HttpStatus.NOT_FOUND);
        }
        return notification;
    }
    async create(createNotificationDto) {
        return this.notificationsService.create(createNotificationDto);
    }
    async update(id, updateNotificationDto) {
        const existingNotification = await this.findOne(id);
        return this.notificationsService.update(id, updateNotificationDto);
    }
    async remove(id) {
        const existingNotification = await this.findOne(id);
        return this.notificationsService.remove(id);
    }
    async markAsRead(id) {
        return this.notificationsService.markAsRead(id);
    }
    async markAsUnread(id) {
        return this.notificationsService.markAsUnread(id);
    }
    async markAllAsRead(userId) {
        return this.notificationsService.markAllAsReadForUser(userId);
    }
    async sendPendingNotifications() {
        return this.notificationsService.sendPendingNotifications();
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all notifications' }),
    (0, swagger_1.ApiQuery)({ name: 'userId', required: false, description: 'Filter by user ID' }),
    (0, swagger_1.ApiQuery)({ name: 'petId', required: false, description: 'Filter by pet ID' }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: interfaces_1.NotificationType, description: 'Filter by notification type' }),
    (0, swagger_1.ApiQuery)({ name: 'priority', required: false, enum: interfaces_1.NotificationPriority, description: 'Filter by priority' }),
    (0, swagger_1.ApiQuery)({ name: 'isRead', required: false, description: 'Filter by read status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of notifications retrieved successfully' }),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('petId')),
    __param(2, (0, common_1.Query)('type')),
    __param(3, (0, common_1.Query)('priority')),
    __param(4, (0, common_1.Query)('isRead')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pending'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pending notifications (scheduled but not sent)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pending notifications retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "getPendingNotifications", null);
__decorate([
    (0, common_1.Get)('urgent'),
    (0, swagger_1.ApiOperation)({ summary: 'Get urgent notifications' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Urgent notifications retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "getUrgentNotifications", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get notification statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notification statistics retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get notification by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Notification ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notification retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Notification not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new notification' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Notification created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a notification' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Notification ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notification updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Notification not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a notification' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Notification ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notification deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Notification not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/mark-read'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark notification as read' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Notification ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notification marked as read successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Patch)(':id/mark-unread'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark notification as unread' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Notification ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notification marked as unread successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAsUnread", null);
__decorate([
    (0, common_1.Post)('mark-all-read/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark all notifications as read for a user' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All notifications marked as read successfully' }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAllAsRead", null);
__decorate([
    (0, common_1.Post)('send-pending'),
    (0, swagger_1.ApiOperation)({ summary: 'Send all pending notifications that are due' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pending notifications sent successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "sendPendingNotifications", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, swagger_1.ApiTags)('notifications'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], NotificationsController);
//# sourceMappingURL=notifications.controller.js.map