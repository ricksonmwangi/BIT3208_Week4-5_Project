// config/db.js
// -------------------------------------------------------
// MySQL Database Connection
// Uses mysql2 with a connection pool for efficiency.
// Connection string is built from .env variables.
// -------------------------------------------------------

require('dotenv').config();
const mysql = require('mysql2/promise');

// Build connection string (displayed on startup for reference)
const CONNECTION_STRING =
  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD || ''}` +
  `@${process.env.DB_HOST}:${process.env.DB_PORT || 3306}/${process.env.DB_NAME}`;

const pool = mysql.createPool({
  host:               process.env.DB_HOST     || 'localhost',
  port:               process.env.DB_PORT     || 3306,
  user:               process.env.DB_USER     || 'root',
  password:           process.env.DB_PASSWORD || '',
  database:           process.env.DB_NAME     || 'bit3208db',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
});

// Test connection on startup
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅  Database connected successfully');
    console.log(`    Connection string: ${CONNECTION_STRING}`);
    conn.release();
  } catch (err) {
    console.error('❌  Database connection failed:', err.message);
    process.exit(1);
  }
})();

module.exports = pool;
