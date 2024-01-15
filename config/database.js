const {createPool} = require("mysql2");
const serverSettings = {
    host: 'localhost',
    user: 'root',
    password: 'Apple12bws',
    database: 'level_X',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
}

const pool = createPool(serverSettings);

module.exports = pool;