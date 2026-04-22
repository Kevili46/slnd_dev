import 'dotenv/config';
import pg from 'pg';

const pool = new pg.Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '4610'),
    user: process.env.DB_USER || 'slnd_admin',
    password: process.env.DB_PASSWORD || 'dev_password',
    database: process.env.DB_NAME || 'slnd_db',
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Connected to PostgreSQL at:', res.rows[0].now);
    }
});

export default pool;