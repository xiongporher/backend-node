import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: "",
    database: process.env.DB,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
})