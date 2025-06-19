const mysql = require('mysql2/promise');

async function connectMySQL() {
    const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library_management',
    });
    console.log("Sudah terhubung ke Database MySQL");
    return connection;
}

module.exports = { connectMySQL };