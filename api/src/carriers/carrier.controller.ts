import express from 'express';
import { carrierRepository } from './carrier.repository';

export const carrierRouter = express.Router();

carrierRouter.get('/', (_req, res) => {
  res.json(carrierRepository.findAll());
});

carrierRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const carrier = carrierRepository.findById(id);
  if (!carrier) return res.status(404).json({ message: 'Transportadora não encontrada.' });
  res.json(carrier);
});

carrierRouter.post('/', (req, res) => {
  const { name, companyName, email, phone, document, city } = req.body as {
    name: string;
    companyName: string;
    email: string;
    phone: string;
    document: string;
    city: string;
  };

  if (!name || !companyName || !email || !phone || !document || !city) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  const carrier = carrierRepository.create({ name, companyName, email, phone, document, city });
  return res.status(201).json(carrier);
});

carrierRouter.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const carrier = carrierRepository.update(id, req.body);
  if (!carrier) return res.status(404).json({ message: 'Transportadora não encontrada.' });
  res.json(carrier);
});

carrierRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const deleted = carrierRepository.delete(id);
  if (!deleted) return res.status(404).json({ message: 'Transportadora não encontrada.' });
  res.status(204).send();
});
