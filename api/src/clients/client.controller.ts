import { Request, Response, Router } from 'express';
import { clientRepository } from './client.repository';

export const clientRouter = Router();

clientRouter.get('/', (_req: Request, res: Response) => {
  res.json(clientRepository.findAll());
});

clientRouter.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const client = clientRepository.findById(id);
  if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
  res.json(client);
});

clientRouter.post('/', (req: Request, res: Response) => {
  const { name, email, phone, birthDate, address } = req.body;
  const created = clientRepository.create({ name, email, phone, birthDate, address });
  res.status(201).json(created);
});

clientRouter.put('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = clientRepository.update(id, req.body);
  if (!updated) return res.status(404).json({ message: 'Cliente não encontrado' });
  res.json(updated);
});

clientRouter.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const ok = clientRepository.delete(id);
  if (!ok) return res.status(404).json({ message: 'Cliente não encontrado' });
  res.status(204).send();
});
