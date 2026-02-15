import express from 'express';
import cors from 'cors';
import { clientRouter } from './clients/client.controller';
import { requestRouter } from './requests/request.controller';
import { offerRouter } from './offers/offer.controller';
import { serviceRequestRouter } from './serviceRequests/service-request.controller';
import { authRouter } from './auth/auth.controller';
import { carrierRouter } from './carriers/carrier.controller';
import { carrierProfileRouter } from './carrierProfile/carrier-profile.controller';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/clients', clientRouter);
app.use('/requests', requestRouter);
app.use('/offers', offerRouter);
app.use('/service-requests', serviceRequestRouter);
app.use('/carriers', carrierRouter);
app.use('/auth', authRouter);
app.use('/carrier-profile', carrierProfileRouter);

app.listen(port, () => {
  console.log(`API Click Cargo ouvindo na porta ${port}`);
});
