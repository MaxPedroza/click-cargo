export interface BudgetRequest {
  id: number;
  pickupAddress: string;
  pickupReference?: string;
  pickupPropertyType?: string;
  deliveryAddress: string;
  deliveryReference?: string;
  deliveryPropertyType?: string;
  requesterName: string;
  requesterAge?: number;
  requesterPhone?: string;
  requesterEmail?: string;
  createdAt: string;
}
