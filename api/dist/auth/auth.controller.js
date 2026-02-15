"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_repository_1 = require("./user.repository");
exports.authRouter = express_1.default.Router();
exports.authRouter.post('/register', (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Nome, e-mail, senha e tipo são obrigatórios.' });
        }
        const user = user_repository_1.userRepository.create(name, email, password, role);
        return res.status(201).json(user_repository_1.userRepository.getPublicUser(user));
    }
    catch (error) {
        return res.status(400).json({ message: error.message || 'Erro ao cadastrar usuário.' });
    }
});
exports.authRouter.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
    }
    const user = user_repository_1.userRepository.findByEmail(email);
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }
    return res.json({
        user: user_repository_1.userRepository.getPublicUser(user),
        token: 'demo-token',
    });
});
