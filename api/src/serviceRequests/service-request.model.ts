export type ServiceType = 'vistoria' | 'seguro' | 'organizer';

export interface ServiceRequest {
  id: number;
  type: ServiceType;
  clientName: string;
  details: string;
  createdAt: string;
}
