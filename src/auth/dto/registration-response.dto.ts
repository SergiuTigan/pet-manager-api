import { UserType } from '@/common/interfaces';

export interface RegistrationResponseData {
  id: number;
  email: string;
  name: string;
  phone: string;
  type: UserType;
  avatar?: string;
  created_at: Date;
  last_login: Date;
  clinic_name?: string;
  clinic_address?: string;
  license_number?: string;
  specializations?: string[];
  working_hours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

export interface RegistrationResponse {
  success: boolean;
  data: RegistrationResponseData;
  message: string;
}