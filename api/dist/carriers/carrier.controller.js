"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carrierRouter = void 0;
const express_1 = __importDefault(require("express"));
const carrier_repository_1 = require("./carrier.repository");
exports.carrierRouter = express_1.default.Router();
exports.carrierRouter.get('/', (_req, res) => {
    res.json(carrier_repository_1.carrierRepository.findAll());
});
exports.carrierRouter.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const carrier = carrier_repository_1.carrierRepository.findById(id);
    if (!carrier)
        return res.status(404).json({ message: 'Transportadora não encontrada.' });
    res.json(carrier);
});
exports.carrierRouter.post('/', (req, res) => {
    const { name, companyName, email, phone, document, city } = req.body;
    if (!name || !companyName || !email || !phone || !document || !city) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    const carrier = carrier_repository_1.carrierRepository.create({ name, companyName, email, phone, document, city });
    return res.status(201).json(carrier);
});
exports.carrierRouter.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const carrier = carrier_repository_1.carrierRepository.update(id, req.body);
    if (!carrier)
        return res.status(404).json({ message: 'Transportadora não encontrada.' });
    res.json(carrier);
});
exports.carrierRouter.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const deleted = carrier_repository_1.carrierRepository.delete(id);
    if (!deleted)
        return res.status(404).json({ message: 'Transportadora não encontrada.' });
    res.status(204).send();
});
