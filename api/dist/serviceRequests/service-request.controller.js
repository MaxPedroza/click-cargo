"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRequestRouter = void 0;
const express_1 = require("express");
const service_request_repository_1 = require("./service-request.repository");
exports.serviceRequestRouter = (0, express_1.Router)();
exports.serviceRequestRouter.get('/', (_req, res) => {
    res.json(service_request_repository_1.serviceRequestRepository.findAll());
});
exports.serviceRequestRouter.post('/', (req, res) => {
    const { type, clientName, details } = req.body;
    const created = service_request_repository_1.serviceRequestRepository.create(type, clientName, details);
    res.status(201).json(created);
});
