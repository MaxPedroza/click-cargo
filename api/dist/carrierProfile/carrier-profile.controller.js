"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carrierProfileRouter = void 0;
const express_1 = require("express");
const carrier_profile_repository_1 = require("./carrier-profile.repository");
exports.carrierProfileRouter = (0, express_1.Router)();
exports.carrierProfileRouter.get('/', (_req, res) => {
    const profile = carrier_profile_repository_1.carrierProfileRepository.getProfile();
    res.json(profile);
});
exports.carrierProfileRouter.post('/plan', (req, res) => {
    const { planKey } = req.body;
    if (!planKey || !['free', 'prata', 'ouro'].includes(planKey)) {
        return res.status(400).json({ message: 'Plano inválido. Use free, prata ou ouro.' });
    }
    const updated = carrier_profile_repository_1.carrierProfileRepository.updatePlan(planKey);
    res.status(200).json(updated);
});
