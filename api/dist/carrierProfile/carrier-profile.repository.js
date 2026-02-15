"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carrierProfileRepository = void 0;
const json_db_1 = require("../utils/json-db");
const FILE_PATH = 'data/carrier-profile.json';
function ensureProfile() {
    let profile = (0, json_db_1.loadJsonFile)(FILE_PATH, null);
    if (!profile) {
        profile = {
            id: 1,
            name: 'TransClick Logística',
            plan: 'Free',
            price: 0,
            validUntil: null,
        };
        (0, json_db_1.saveJsonFile)(FILE_PATH, profile);
    }
    return profile;
}
function computePlan(planKey) {
    const now = Date.now();
    const oneMonthMs = 30 * 24 * 60 * 60 * 1000;
    if (planKey === 'free') {
        return { plan: 'Free', price: 0, validUntil: null };
    }
    if (planKey === 'prata') {
        return {
            plan: 'Plano Prata',
            price: 199,
            validUntil: new Date(now + oneMonthMs).toISOString(),
        };
    }
    return {
        plan: 'Plano Ouro',
        price: 399,
        validUntil: new Date(now + oneMonthMs).toISOString(),
    };
}
exports.carrierProfileRepository = {
    getProfile() {
        return ensureProfile();
    },
    updatePlan(planKey) {
        const current = ensureProfile();
        const planInfo = computePlan(planKey);
        const updated = { ...current, ...planInfo };
        (0, json_db_1.saveJsonFile)(FILE_PATH, updated);
        return updated;
    },
};
