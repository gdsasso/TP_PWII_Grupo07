const mysql = require('mysql2/promise');
const { DB_CONFIG } = require('./config');

let connection;


module.exports = {
    async initDB() {
      connection = await mysql.createConnection(DB_CONFIG)
    }};

