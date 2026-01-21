const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQL_PORT)
});

db.connect((err) => {
  if (err) {
    console.error('DB ERROR:', err.message);
    process.exit(1); // MUHIIM
  }
  console.log('Database connected');
});

module.exports = db;
