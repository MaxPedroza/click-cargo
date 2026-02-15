import { Request, Response, Router } from 'express';
import { requestRepository } from './request.repository';

export const requestRouter = Router();

requestRouter.get('/', (_req: Request, res: Response) => {
  res.json(requestRepository.findAll());
});

requestRouter.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const found = requestRepository.findById(id);
  if (!found) return res.status(404).json({ message: 'Pedido não encontrado' });
  res.json(found);
});

requestRouter.post('/', (req: Request, res: Response) => {
  const created = requestRepository.create(req.body);
  res.status(201).json(created);
});
