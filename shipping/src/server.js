
import express from 'express';
import bodyParser from 'body-parser';
import healthCheck from 'express-healthcheck';
import morgan from 'morgan';

import { ShippingInfoRouter } from './routes';
import { serverConfig } from './config';
import log from './log';

const app = express();

app.use(bodyParser.json());
app.use(morgan('combined'));

const router = express.Router();
router.use('/healthcheck', healthCheck());
router.use('/users/:userId/addresses', ShippingInfoRouter);
app.use('/shipping', router);

export default function startServer() {
    return app.listen(serverConfig.port, () => {
        log.debug(`Listening on localhost:${serverConfig.port}`);
    });
}
