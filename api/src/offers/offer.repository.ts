import { Offer } from './offer.model';

let offers: Offer[] = [
  {
    id: 1,
    requestId: 1,
    carrierName: 'TransClick Logística',
    plan: 'Plano Prata',
    price: 1850,
    validityDate: new Date(Date.now() + 5 * 86400000).toISOString(),
    status: 'enviado',
  },
  {
    id: 2,
    requestId: 1,
    carrierName: 'Mudanças Expressa',
    plan: 'Plano Ouro',
    price: 2350,
    validityDate: new Date(Date.now() + 7 * 86400000).toISOString(),
    status: 'enviado',
  },
];

let nextId = offers.length + 1;

export const offerRepository = {
  findAll(): Offer[] {
    return offers;
  },
  findByRequest(requestId: number): Offer[] {
    return offers.filter(o => o.requestId === requestId);
  },
  updateStatus(id: number, status: Offer['status']): Offer | undefined {
    const index = offers.findIndex(o => o.id === id);
    if (index === -1) return undefined;
    offers[index] = { ...offers[index], status };
    return offers[index];
  },
};
