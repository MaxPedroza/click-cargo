import { Router } from 'express';
import { carrierProfileRepository } from './carrier-profile.repository';
import { CarrierPlanKey } from './carrier-profile.model';

export const carrierProfileRouter = Router();

carrierProfileRouter.get('/', (_req, res) => {
  const profile = carrierProfileRepository.getProfile();
  res.json(profile);
});

carrierProfileRouter.post('/plan', (req, res) => {
  const { planKey } = req.body as { planKey?: CarrierPlanKey };

  if (!planKey || !['free', 'prata', 'ouro'].includes(planKey)) {
    return res.status(400).json({ message: 'Plano inválido. Use free, prata ou ouro.' });
  }

  const updated = carrierProfileRepository.updatePlan(planKey);
  res.status(200).json(updated);
});
