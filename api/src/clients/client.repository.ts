import { Client } from './client.model';
import { loadJsonFile, saveJsonFile } from '../utils/json-db';

const FILE_PATH = 'data/clients.json';

function loadClients(): Client[] {
  return loadJsonFile<Client[]>(FILE_PATH, []);
}

function saveClients(clients: Client[]): void {
  saveJsonFile<Client[]>(FILE_PATH, clients);
}

function getNextId(clients: Client[]): number {
  if (!clients.length) return 1;
  return Math.max(...clients.map(c => c.id)) + 1;
}

export const clientRepository = {
  findAll(): Client[] {
    return loadClients();
  },
  findById(id: number): Client | undefined {
    return loadClients().find(c => c.id === id);
  },
  create(data: Omit<Client, 'id'>): Client {
    const clients = loadClients();
    const client: Client = { id: getNextId(clients), ...data };
    clients.push(client);
    saveClients(clients);
    return client;
  },
  update(id: number, data: Partial<Omit<Client, 'id'>>): Client | undefined {
    const clients = loadClients();
    const index = clients.findIndex(c => c.id === id);
    if (index === -1) return undefined;
    clients[index] = { ...clients[index], ...data };
    saveClients(clients);
    return clients[index];
  },
  delete(id: number): boolean {
    const clients = loadClients();
    const before = clients.length;
    const updated = clients.filter(c => c.id !== id);
    if (updated.length === before) return false;
    saveClients(updated);
    return true;
  }
};
