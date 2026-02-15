"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRequestRepository = void 0;
let requests = [];
let nextId = 1;
exports.serviceRequestRepository = {
    create(type, clientName, details) {
        const req = {
            id: nextId++,
            type,
            clientName,
            details,
            createdAt: new Date().toISOString(),
        };
        requests.push(req);
        return req;
    },
    findAll() {
        return requests;
    },
};
