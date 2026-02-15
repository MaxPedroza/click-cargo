import { ServiceRequest, ServiceType } from './service-request.model';

let requests: ServiceRequest[] = [];
let nextId = 1;

export const serviceRequestRepository = {
  create(type: ServiceType, clientName: string, details: string): ServiceRequest {
    const req: ServiceRequest = {
      id: nextId++,
      type,
      clientName,
      details,
      createdAt: new Date().toISOString(),
    };
    requests.push(req);
    return req;
  },
  findAll(): ServiceRequest[] {
    return requests;
  },
};
