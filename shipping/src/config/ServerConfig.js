
export default class ServerConfig {
    constructor({ server }) {
        this.port = server.port;
        this.jwtSecret = server.jwtSecret;
    }
}
