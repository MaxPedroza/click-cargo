import { SupportMessage } from './support-message.model';
import { loadJsonFile, saveJsonFile } from '../utils/json-db';

const FILE_PATH = 'data/support-messages.json';

interface SupportStore {
  nextId: number;
  items: SupportMessage[];
}

function loadStore(): SupportStore {
  const store = loadJsonFile<SupportStore | null>(FILE_PATH, null);
  if (!store) {
    return { nextId: 1, items: [] };
  }
  return store;
}

function saveStore(store: SupportStore) {
  saveJsonFile(FILE_PATH, store);
}

export const supportMessageRepository = {
  findAll(): SupportMessage[] {
    const store = loadStore();
    return store.items;
  },

  create(data: Omit<SupportMessage, 'id' | 'createdAt'>): SupportMessage {
    const store = loadStore();
    const message: SupportMessage = {
      id: store.nextId++,
      createdAt: new Date().toISOString(),
      ...data,
    };
    store.items.push(message);
    saveStore(store);
    return message;
  },
};
