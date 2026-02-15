import { BudgetRequest } from './request.model';

let requests: BudgetRequest[] = [];
let nextId = 1;

export const requestRepository = {
  findAll(): BudgetRequest[] {
    return requests;
  },
  findById(id: number): BudgetRequest | undefined {
    return requests.find(r => r.id === id);
  },
  create(data: Omit<BudgetRequest, 'id' | 'createdAt'>): BudgetRequest {
    const request: BudgetRequest = {
      id: nextId++,
      createdAt: new Date().toISOString(),
      ...data,
    };
    requests.push(request);
    return request;
  },
};
