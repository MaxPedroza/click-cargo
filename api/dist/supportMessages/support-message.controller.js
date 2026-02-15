"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportMessageRouter = void 0;
const express_1 = require("express");
const support_message_repository_1 = require("./support-message.repository");
exports.supportMessageRouter = (0, express_1.Router)();
exports.supportMessageRouter.get('/', (_req, res) => {
    const all = support_message_repository_1.supportMessageRepository.findAll();
    res.json(all);
});
exports.supportMessageRouter.post('/', (req, res) => {
    const { type, name, email, phone, subject, message, origin } = req.body;
    const errors = [];
    if (!type)
        errors.push('type é obrigatório.');
    if (!name)
        errors.push('name é obrigatório.');
    if (!email)
        errors.push('email é obrigatório.');
    if (!subject)
        errors.push('subject é obrigatório.');
    if (!message)
        errors.push('message é obrigatório.');
    if (!origin)
        errors.push('origin é obrigatório.');
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Campos obrigatórios ausentes', errors });
    }
    const created = support_message_repository_1.supportMessageRepository.create({
        // Após a validação acima, os campos não serão mais undefined
        type: type,
        name: name,
        email: email,
        phone,
        subject: subject,
        message: message,
        origin: origin,
    });
    // Nesta versão de demonstração, o envio real de e-mail é simulado.
    // A mensagem é registrada em arquivo JSON para consulta posterior.
    res.status(201).json(created);
});
