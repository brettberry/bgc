
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import healthCheck from 'express-healthcheck';
import cors from 'cors';
import morgan from 'morgan';

import { SESSION_SECRET, COOKIE_NAME } from './constants';
import { serverConfig } from './config';
import log from './log';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    name: COOKIE_NAME,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    key: COOKIE_NAME,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false
    }
}));
app.use(morgan('combined'));
app.use(cors({
    origin: true,
    credentials: true,
    preflightContinue: true
}));

const router = express.Router();
router.use('/healthcheck', healthCheck());
app.use('/shipping', router);

export default function startServer() {
    return app.listen(serverConfig.port, () => {
        log.debug(`Listening on localhost:${serverConfig.port}`);
    });
}
