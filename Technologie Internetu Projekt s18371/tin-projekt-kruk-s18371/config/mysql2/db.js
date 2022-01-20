const mysql = require('mysql2');

const pool = mysql.createPool({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'tin-projekt-kruk-s18371'
});

module.exports = pool;
