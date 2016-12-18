import log4js from 'log4js';

log4js.configure({
    appenders: [
        {
            type: 'console'
        },
        {
            type: 'log4js-logstash',
            host: 'localhost',
            port: 5959,
            fields: {
                source: 'auth'
            }
        }
    ],
    replaceConsole: false
});

const logger = log4js.getLogger();

export default logger;
