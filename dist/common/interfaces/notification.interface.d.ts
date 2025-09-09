export declare enum NotificationType {
    VACCINATION_REMINDER = "vaccination_reminder",
    VACCINATION_EXPIRED = "vaccination_expired",
    DOCUMENT_ADDED = "document_added",
    APPOINTMENT_REMINDER = "appointment_reminder",
    CONSULTATION_SUMMARY = "consultation_summary",
    HEALTH_ALERT = "health_alert",
    INSURANCE_REMINDER = "insurance_reminder",
    APPOINTMENT_CONFIRMED = "appointment_confirmed",
    EMERGENCY_APPOINTMENT = "emergency_appointment",
    SCHEDULE_REMINDER = "schedule_reminder"
}
export declare enum NotificationPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent"
}
export interface NotificationMetadata {
    vaccination_id?: number;
    document_id?: number;
    appointment_id?: number;
    consultation_id?: number;
    vet_id?: number;
    days_until_due?: number;
    days_since_expired?: number;
    vaccine_type?: string;
    document_type?: string;
    weather_alert?: boolean;
    temperature?: number;
    health_condition?: string;
    insurance_expiry?: string;
    months_until_expiry?: number;
    policy_number?: string;
    owner_name?: string;
    pet_name?: string;
    emergency_type?: string;
    owner_phone?: string;
    appointments_count?: number;
    urgent_count?: number;
    date?: string;
}
export interface Notification {
    id: number;
    user_id: number;
    pet_id?: number | null;
    type: NotificationType;
    title: string;
    message: string;
    priority: NotificationPriority;
    is_read: boolean;
    action_required: boolean;
    action_url?: string;
    scheduled_for: string;
    sent_at?: string | null;
    expires_at?: string | null;
    metadata: NotificationMetadata;
    created_at: string;
}
