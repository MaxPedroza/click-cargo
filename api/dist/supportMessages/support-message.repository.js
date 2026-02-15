"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportMessageRepository = void 0;
const json_db_1 = require("../utils/json-db");
const FILE_PATH = 'data/support-messages.json';
function loadStore() {
    const store = (0, json_db_1.loadJsonFile)(FILE_PATH, null);
    if (!store) {
        return { nextId: 1, items: [] };
    }
    return store;
}
function saveStore(store) {
    (0, json_db_1.saveJsonFile)(FILE_PATH, store);
}
exports.supportMessageRepository = {
    findAll() {
        const store = loadStore();
        return store.items;
    },
    create(data) {
        const store = loadStore();
        const message = {
            id: store.nextId++,
            createdAt: new Date().toISOString(),
            ...data,
        };
        store.items.push(message);
        saveStore(store);
        return message;
    },
};
