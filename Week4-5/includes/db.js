// includes/db.js
// ─── MySQL Connection using .env connection string ────────────
require('dotenv').config();
const mysql = require('mysql2');

// Connection pool (better than single connection for web apps)
const pool = mysql.createPool({
    host    : process.env.DB_HOST     || 'localhost',
    user    : process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME     || 'bit3208_week5db',
    port    : process.env.DB_PORT     || 3306,
    waitForConnections: true,
    connectionLimit   : 10,
    queueLimit        : 0
});

// Test connection on startup
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection FAILED:', err.message);
        console.error('   Check your .env DB settings and ensure MySQL is running.');
    } else {
        console.log('✅ Database connected successfully –', process.env.DB_NAME);
        connection.release();
    }
});

// Export promise-based pool for async/await usage
module.exports = pool.promise();
