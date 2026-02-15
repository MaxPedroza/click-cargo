import { Request, Response, Router } from 'express';
import { offerRepository } from './offer.repository';

export const offerRouter = Router();

offerRouter.get('/', (_req: Request, res: Response) => {
  res.json(offerRepository.findAll());
});

offerRouter.get('/by-request/:requestId', (req: Request, res: Response) => {
  const requestId = Number(req.params.requestId);
  res.json(offerRepository.findByRequest(requestId));
});

offerRouter.patch('/:id/status', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { status } = req.body as { status: 'enviado' | 'aceito' | 'recusado' };
  const updated = offerRepository.updateStatus(id, status);
  if (!updated) return res.status(404).json({ message: 'Oferta não encontrada' });
  res.json(updated);
});
