const mysql = require('mysql2');

const pool = mysql.createPool({
   host: 'localhost',
   user: 'root',
   password: 'S3w3Krukryn1998',
   database: 'tin-projekt-kruk-s18371'
});

module.exports = pool;