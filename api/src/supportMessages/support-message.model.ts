export type SupportMessageType = 'cliente' | 'transportadora';

export interface SupportMessage {
  id: number;
  type: SupportMessageType;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  origin: 'client-dashboard' | 'carrier-dashboard' | 'landing';
  createdAt: string;
}
