const mysql = require('mysql2/promise');

const options = {
  host: 'localhost',
  user: 'root',
  password: 'qweewq12',
  database: 'feedboard',
  connectionLimit: 30,
};

const pool = mysql.createPool(options);

module.exports = pool;