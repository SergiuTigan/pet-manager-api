export enum DocumentType {
  ANALIZE = 'analize',
  CERTIFICAT = 'certificat',
  RETETA = 'reteta',
  FOTO = 'foto',
  PLAN = 'plan',
  ASIGURARE = 'asigurare',
}

export interface Document {
  id: number;
  pet_id: number;
  document_type: DocumentType;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_by: number;
  upload_date: string;
  consultation_id?: number | null;
  is_public: boolean;
  tags: string[];
  notes: string;
  expiry_date?: string | null;
  created_at: string;
}