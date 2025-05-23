const mysql = require('mysql2');
require('dotenv').config();


const pool = process.env.MYSQL_URL
  ? mysql.createPool(process.env.MYSQL_URL)
  : mysql.createPool({
      host:     process.env.MYSQL_HOST,
      port:     Number(process.env.MYSQL_PORT),
      user:     process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit:    10,
    });

module.exports = pool.promise();
