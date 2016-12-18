
import mysql from 'mysql';
import Promise from 'bluebird';
import _ from 'lodash';

import { mysqlConfig } from './config';

export class MySQLClient {
    constructor(config) {
        const poolOpts = _.extend(
            { multipleStatements: true },
            config.getPoolParams()
        );
        this.pool = mysql.createPool(poolOpts);
    }

    query(...q) {
        return new Promise((resolve, reject) => {
            this.pool.query(...q, (err, data) => {
                err ? reject(err) : resolve(data);
            });
        });
    }
}

export default new MySQLClient(mysqlConfig);
