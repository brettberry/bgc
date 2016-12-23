
import express from 'express';
import bodyParser from 'body-parser';
import healthCheck from 'express-healthcheck';
import morgan from 'morgan';
import cors from 'cors';

import { ShippingInfoRouter, PaymentsRouter } from './routes';
import { serverConfig } from './config';
import log from './log';

const app = express();
app.use(cors({
    origin: true,
    credentials: true,
    preflightContinue: true
}));
app.use(bodyParser.json());
app.use(morgan('combined'));

const router = express.Router();
router.use('/healthcheck', healthCheck());
router.use('/users/:userId/addresses', ShippingInfoRouter);
router.use('/users/:userId/payments', PaymentsRouter);
app.use('/shipping', router);

export default function startServer() {
    return app.listen(serverConfig.port, () => {
        log.debug(`Listening on localhost:${serverConfig.port}`);
    });
}
