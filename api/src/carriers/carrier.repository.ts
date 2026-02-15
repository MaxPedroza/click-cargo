import { Carrier } from './carrier.model';
import { loadJsonFile, saveJsonFile } from '../utils/json-db';

const FILE_PATH = 'data/carriers.json';

function loadCarriers(): Carrier[] {
  return loadJsonFile<Carrier[]>(FILE_PATH, []);
}

function saveCarriers(carriers: Carrier[]): void {
  saveJsonFile<Carrier[]>(FILE_PATH, carriers);
}

function getNextId(carriers: Carrier[]): number {
  if (!carriers.length) return 1;
  return Math.max(...carriers.map(c => c.id)) + 1;
}

export const carrierRepository = {
  findAll(): Carrier[] {
    return loadCarriers();
  },
  findById(id: number): Carrier | undefined {
    return loadCarriers().find(c => c.id === id);
  },
  create(data: Omit<Carrier, 'id'>): Carrier {
    const carriers = loadCarriers();
    const carrier: Carrier = { id: getNextId(carriers), ...data };
    carriers.push(carrier);
    saveCarriers(carriers);
    return carrier;
  },
  update(id: number, data: Partial<Omit<Carrier, 'id'>>): Carrier | undefined {
    const carriers = loadCarriers();
    const index = carriers.findIndex(c => c.id === id);
    if (index === -1) return undefined;
    carriers[index] = { ...carriers[index], ...data };
    saveCarriers(carriers);
    return carriers[index];
  },
  delete(id: number): boolean {
    const carriers = loadCarriers();
    const before = carriers.length;
    const updated = carriers.filter(c => c.id !== id);
    if (updated.length === before) return false;
    saveCarriers(updated);
    return true;
  },
};
