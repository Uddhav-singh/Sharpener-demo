const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    password: 'rootpassword',
    database: 'node-complete'
});

module.exports = pool.promise();