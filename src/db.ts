import { createPool, Pool } from 'mysql2/promise';

const dbHost = process.env.DB_HOST || 'localhost';
const dbUser = process.env.DB_USER || 'admin';
const dbPassword = process.env.DB_PASSWORD || 'admin2402';
const dbName = process.env.DB_NAME || 'STotal';
const dbPort = Number(process.env.DB_PORT) || 3306;

export const pool: Pool = createPool({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  port: dbPort,
});
