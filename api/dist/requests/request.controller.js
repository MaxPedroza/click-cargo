"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestRouter = void 0;
const express_1 = require("express");
const request_repository_1 = require("./request.repository");
exports.requestRouter = (0, express_1.Router)();
exports.requestRouter.get('/', (_req, res) => {
    res.json(request_repository_1.requestRepository.findAll());
});
exports.requestRouter.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const found = request_repository_1.requestRepository.findById(id);
    if (!found)
        return res.status(404).json({ message: 'Pedido não encontrado' });
    res.json(found);
});
exports.requestRouter.post('/', (req, res) => {
    const created = request_repository_1.requestRepository.create(req.body);
    res.status(201).json(created);
});
