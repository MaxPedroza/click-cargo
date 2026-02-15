export interface Offer {
  id: number;
  requestId: number;
  carrierName: string;
  plan: string;
  price: number;
  validityDate: string;
  status: 'enviado' | 'aceito' | 'recusado';
}
