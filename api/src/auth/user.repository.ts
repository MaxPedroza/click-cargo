import { User, UserRole } from './user.model';

let nextId = 1;

const users: User[] = [
  {
    id: nextId++,
    name: 'Cliente Demo',
    email: 'cliente@clickcargo.com',
    password: '123456',
    role: 'client',
  },
  {
    id: nextId++,
    name: 'Transportadora Demo',
    email: 'transportadora@clickcargo.com',
    password: '123456',
    role: 'carrier',
  },
];

export const userRepository = {
  findByEmail(email: string): User | undefined {
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },

  create(name: string, email: string, password: string, role: UserRole): User {
    const existing = this.findByEmail(email);
    if (existing) {
      throw new Error('E-mail já cadastrado');
    }
    const user: User = { id: nextId++, name, email, password, role };
    users.push(user);
    return user;
  },

  getPublicUser(user: User) {
    const { password, ...rest } = user;
    return rest;
  },
};
