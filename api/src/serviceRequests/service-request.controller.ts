import { Request, Response, Router } from 'express';
import { serviceRequestRepository } from './service-request.repository';
import { ServiceType } from './service-request.model';

export const serviceRequestRouter = Router();

serviceRequestRouter.get('/', (_req: Request, res: Response) => {
  res.json(serviceRequestRepository.findAll());
});

serviceRequestRouter.post('/', (req: Request, res: Response) => {
  const { type, clientName, details } = req.body as { type: ServiceType; clientName: string; details: string };
  const created = serviceRequestRepository.create(type, clientName, details);
  res.status(201).json(created);
});
