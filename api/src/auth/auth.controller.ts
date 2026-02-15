import express from 'express';
import { userRepository } from './user.repository';
import { UserRole } from './user.model';

export const authRouter = express.Router();

authRouter.post('/register', (req, res) => {
  try {
    const { name, email, password, role } = req.body as {
      name: string;
      email: string;
      password: string;
      role: UserRole;
    };

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Nome, e-mail, senha e tipo são obrigatórios.' });
    }

    const user = userRepository.create(name, email, password, role);
    return res.status(201).json(userRepository.getPublicUser(user));
  } catch (error: any) {
    return res.status(400).json({ message: error.message || 'Erro ao cadastrar usuário.' });
  }
});

authRouter.post('/login', (req, res) => {
  const { email, password } = req.body as { email: string; password: string };

  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
  }

  const user = userRepository.findByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
  }

  return res.json({
    user: userRepository.getPublicUser(user),
    token: 'demo-token',
  });
});
