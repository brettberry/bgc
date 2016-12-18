
export default class MySQLConfig {
    constructor({ mysql }) {
        this.host = mysql.host;
        this.port = mysql.port;
        this.user = mysql.user;
        this.password = mysql.password;
        this.database = mysql.database;
    }

    getPoolParams() {
        let params = {
            connectionLimit: 10,
            host: this.host,
            port: this.port,
            user: this.user,
            password: this.password,
            database: this.database
        };
        return params;
    }
}
