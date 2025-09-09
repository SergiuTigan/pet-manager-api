export enum UserType {
  OWNER = 'owner',
  VETERINARIAN = 'veterinarian',
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    reminders: boolean;
  };
  language: string;
}

export interface WorkingHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  type: UserType;
  avatar?: string;
  created_at: string;
  last_login: string;
  preferences: UserPreferences;
  
  // Veterinarian-specific fields
  clinic_name?: string;
  clinic_address?: string;
  license_number?: string;
  specializations?: string[];
  working_hours?: WorkingHours;
}