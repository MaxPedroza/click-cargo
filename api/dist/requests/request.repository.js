"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestRepository = void 0;
let requests = [];
let nextId = 1;
exports.requestRepository = {
    findAll() {
        return requests;
    },
    findById(id) {
        return requests.find(r => r.id === id);
    },
    create(data) {
        const request = {
            id: nextId++,
            createdAt: new Date().toISOString(),
            ...data,
        };
        requests.push(request);
        return request;
    },
};
