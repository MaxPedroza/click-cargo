export interface CarrierProfile {
  id: number;
  name: string;
  plan: string; // Free, Prata, Ouro
  price: number;
  validUntil: string | null; // ISO date or null for plano Free
}

export type CarrierPlanKey = 'free' | 'prata' | 'ouro';
