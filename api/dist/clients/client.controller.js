"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRouter = void 0;
const express_1 = require("express");
const client_repository_1 = require("./client.repository");
exports.clientRouter = (0, express_1.Router)();
exports.clientRouter.get('/', (_req, res) => {
    res.json(client_repository_1.clientRepository.findAll());
});
exports.clientRouter.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const client = client_repository_1.clientRepository.findById(id);
    if (!client)
        return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(client);
});
exports.clientRouter.post('/', (req, res) => {
    const { name, email, phone, birthDate, address } = req.body;
    const created = client_repository_1.clientRepository.create({ name, email, phone, birthDate, address });
    res.status(201).json(created);
});
exports.clientRouter.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const updated = client_repository_1.clientRepository.update(id, req.body);
    if (!updated)
        return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(updated);
});
exports.clientRouter.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const ok = client_repository_1.clientRepository.delete(id);
    if (!ok)
        return res.status(404).json({ message: 'Cliente não encontrado' });
    res.status(204).send();
});
