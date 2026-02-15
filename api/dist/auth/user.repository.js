"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
let nextId = 1;
const users = [
    {
        id: nextId++,
        name: 'Cliente Demo',
        email: 'cliente@clickcargo.com',
        password: '123456',
        role: 'client',
    },
    {
        id: nextId++,
        name: 'Transportadora Demo',
        email: 'transportadora@clickcargo.com',
        password: '123456',
        role: 'carrier',
    },
];
exports.userRepository = {
    findByEmail(email) {
        return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    },
    create(name, email, password, role) {
        const existing = this.findByEmail(email);
        if (existing) {
            throw new Error('E-mail já cadastrado');
        }
        const user = { id: nextId++, name, email, password, role };
        users.push(user);
        return user;
    },
    getPublicUser(user) {
        const { password, ...rest } = user;
        return rest;
    },
};
