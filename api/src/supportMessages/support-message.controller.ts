import { Router } from 'express';
import { supportMessageRepository } from './support-message.repository';
import { SupportMessageType } from './support-message.model';

export const supportMessageRouter = Router();

supportMessageRouter.get('/', (_req, res) => {
  const all = supportMessageRepository.findAll();
  res.json(all);
});

supportMessageRouter.post('/', (req, res) => {
  const { type, name, email, phone, subject, message, origin } = req.body as {
    type?: SupportMessageType;
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
    origin?: 'client-dashboard' | 'carrier-dashboard' | 'landing';
  };

  const errors: string[] = [];
  if (!type) errors.push('type é obrigatório.');
  if (!name) errors.push('name é obrigatório.');
  if (!email) errors.push('email é obrigatório.');
  if (!subject) errors.push('subject é obrigatório.');
  if (!message) errors.push('message é obrigatório.');
  if (!origin) errors.push('origin é obrigatório.');

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Campos obrigatórios ausentes', errors });
  }

  const created = supportMessageRepository.create({
    // Após a validação acima, os campos não serão mais undefined
    type: type!,
    name: name!,
    email: email!,
    phone,
    subject: subject!,
    message: message!,
    origin: origin!,
  });

  // Nesta versão de demonstração, o envio real de e-mail é simulado.
  // A mensagem é registrada em arquivo JSON para consulta posterior.

  res.status(201).json(created);
});
