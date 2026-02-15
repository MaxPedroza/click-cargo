"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offerRouter = void 0;
const express_1 = require("express");
const offer_repository_1 = require("./offer.repository");
exports.offerRouter = (0, express_1.Router)();
exports.offerRouter.get('/', (_req, res) => {
    res.json(offer_repository_1.offerRepository.findAll());
});
exports.offerRouter.get('/by-request/:requestId', (req, res) => {
    const requestId = Number(req.params.requestId);
    res.json(offer_repository_1.offerRepository.findByRequest(requestId));
});
exports.offerRouter.post('/', (req, res) => {
    const { requestId, carrierName, plan, price, validityDate, status } = req.body;
    if (!requestId || !carrierName || !plan || typeof price !== 'number' || !validityDate) {
        return res.status(400).json({ message: 'Dados da proposta inválidos.' });
    }
    const created = offer_repository_1.offerRepository.create({
        requestId: Number(requestId),
        carrierName,
        plan,
        price,
        validityDate,
        status: status ?? 'enviado',
    });
    res.status(201).json(created);
});
exports.offerRouter.patch('/:id/status', (req, res) => {
    const id = Number(req.params.id);
    const { status } = req.body;
    const updated = offer_repository_1.offerRepository.updateStatus(id, status);
    if (!updated)
        return res.status(404).json({ message: 'Oferta não encontrada' });
    res.json(updated);
});
