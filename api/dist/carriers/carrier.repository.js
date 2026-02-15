"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carrierRepository = void 0;
const json_db_1 = require("../utils/json-db");
const FILE_PATH = 'data/carriers.json';
function loadCarriers() {
    return (0, json_db_1.loadJsonFile)(FILE_PATH, []);
}
function saveCarriers(carriers) {
    (0, json_db_1.saveJsonFile)(FILE_PATH, carriers);
}
function getNextId(carriers) {
    if (!carriers.length)
        return 1;
    return Math.max(...carriers.map(c => c.id)) + 1;
}
exports.carrierRepository = {
    findAll() {
        return loadCarriers();
    },
    findById(id) {
        return loadCarriers().find(c => c.id === id);
    },
    create(data) {
        const carriers = loadCarriers();
        const carrier = { id: getNextId(carriers), ...data };
        carriers.push(carrier);
        saveCarriers(carriers);
        return carrier;
    },
    update(id, data) {
        const carriers = loadCarriers();
        const index = carriers.findIndex(c => c.id === id);
        if (index === -1)
            return undefined;
        carriers[index] = { ...carriers[index], ...data };
        saveCarriers(carriers);
        return carriers[index];
    },
    delete(id) {
        const carriers = loadCarriers();
        const before = carriers.length;
        const updated = carriers.filter(c => c.id !== id);
        if (updated.length === before)
            return false;
        saveCarriers(updated);
        return true;
    },
};
