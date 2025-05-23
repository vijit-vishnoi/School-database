const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool(process.env.MYSQL_URL || {
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool.promise();