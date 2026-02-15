"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offerRepository = void 0;
let offers = [
    {
        id: 1,
        requestId: 1,
        carrierName: 'TransClick Logística',
        plan: 'Plano Prata',
        price: 1850,
        validityDate: new Date(Date.now() + 5 * 86400000).toISOString(),
        status: 'enviado',
    },
    {
        id: 2,
        requestId: 1,
        carrierName: 'Mudanças Expressa',
        plan: 'Plano Ouro',
        price: 2350,
        validityDate: new Date(Date.now() + 7 * 86400000).toISOString(),
        status: 'enviado',
    },
];
let nextId = offers.length + 1;
exports.offerRepository = {
    findAll() {
        return offers;
    },
    findByRequest(requestId) {
        return offers.filter(o => o.requestId === requestId);
    },
    create(data) {
        const offer = { id: nextId++, ...data };
        offers.push(offer);
        return offer;
    },
    updateStatus(id, status) {
        const index = offers.findIndex(o => o.id === id);
        if (index === -1)
            return undefined;
        offers[index] = { ...offers[index], status };
        return offers[index];
    },
};
