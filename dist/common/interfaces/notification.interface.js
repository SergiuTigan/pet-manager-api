"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationPriority = exports.NotificationType = void 0;
var NotificationType;
(function (NotificationType) {
    NotificationType["VACCINATION_REMINDER"] = "vaccination_reminder";
    NotificationType["VACCINATION_EXPIRED"] = "vaccination_expired";
    NotificationType["DOCUMENT_ADDED"] = "document_added";
    NotificationType["APPOINTMENT_REMINDER"] = "appointment_reminder";
    NotificationType["CONSULTATION_SUMMARY"] = "consultation_summary";
    NotificationType["HEALTH_ALERT"] = "health_alert";
    NotificationType["INSURANCE_REMINDER"] = "insurance_reminder";
    NotificationType["APPOINTMENT_CONFIRMED"] = "appointment_confirmed";
    NotificationType["EMERGENCY_APPOINTMENT"] = "emergency_appointment";
    NotificationType["SCHEDULE_REMINDER"] = "schedule_reminder";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var NotificationPriority;
(function (NotificationPriority) {
    NotificationPriority["LOW"] = "low";
    NotificationPriority["MEDIUM"] = "medium";
    NotificationPriority["HIGH"] = "high";
    NotificationPriority["URGENT"] = "urgent";
})(NotificationPriority || (exports.NotificationPriority = NotificationPriority = {}));
//# sourceMappingURL=notification.interface.js.map