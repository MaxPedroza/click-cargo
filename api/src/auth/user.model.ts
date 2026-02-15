export type UserRole = 'client' | 'carrier';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string; // Apenas para demo, não usar em produção
  role: UserRole;
}
