import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import { Config } from './types';

export const config: Config = {
    serviceName: process.env.SERVICENAME || 'node typescript postgres app',
    port: Number(process.env.PORT) || 5000,
    loggerLevel: 'debug',
    db: {
        user: process.env.DB_USER || '',
        database: process.env.DB_DATABASE || '',
        password: process.env.DB_PASSWORD || '',
        host: process.env.DB_HOST || '',
        port: Number(process.env.DB_PORT) || 5432,
        max: Number(process.env.DB_MAX_CLIENTS) || 20,
        idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS) || 30000,
    },
};
