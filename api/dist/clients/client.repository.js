"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRepository = void 0;
const json_db_1 = require("../utils/json-db");
const FILE_PATH = 'data/clients.json';
function loadClients() {
    return (0, json_db_1.loadJsonFile)(FILE_PATH, []);
}
function saveClients(clients) {
    (0, json_db_1.saveJsonFile)(FILE_PATH, clients);
}
function getNextId(clients) {
    if (!clients.length)
        return 1;
    return Math.max(...clients.map(c => c.id)) + 1;
}
exports.clientRepository = {
    findAll() {
        return loadClients();
    },
    findById(id) {
        return loadClients().find(c => c.id === id);
    },
    create(data) {
        const clients = loadClients();
        const client = { id: getNextId(clients), ...data };
        clients.push(client);
        saveClients(clients);
        return client;
    },
    update(id, data) {
        const clients = loadClients();
        const index = clients.findIndex(c => c.id === id);
        if (index === -1)
            return undefined;
        clients[index] = { ...clients[index], ...data };
        saveClients(clients);
        return clients[index];
    },
    delete(id) {
        const clients = loadClients();
        const before = clients.length;
        const updated = clients.filter(c => c.id !== id);
        if (updated.length === before)
            return false;
        saveClients(updated);
        return true;
    }
};
