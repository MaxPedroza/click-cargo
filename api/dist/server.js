"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_controller_1 = require("./clients/client.controller");
const request_controller_1 = require("./requests/request.controller");
const offer_controller_1 = require("./offers/offer.controller");
const service_request_controller_1 = require("./serviceRequests/service-request.controller");
const auth_controller_1 = require("./auth/auth.controller");
const carrier_controller_1 = require("./carriers/carrier.controller");
const carrier_profile_controller_1 = require("./carrierProfile/carrier-profile.controller");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.use('/clients', client_controller_1.clientRouter);
app.use('/requests', request_controller_1.requestRouter);
app.use('/offers', offer_controller_1.offerRouter);
app.use('/service-requests', service_request_controller_1.serviceRequestRouter);
app.use('/carriers', carrier_controller_1.carrierRouter);
app.use('/auth', auth_controller_1.authRouter);
app.use('/carrier-profile', carrier_profile_controller_1.carrierProfileRouter);
app.listen(port, () => {
    console.log(`API Click Cargo ouvindo na porta ${port}`);
});
