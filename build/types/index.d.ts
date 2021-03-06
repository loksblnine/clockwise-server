export interface Config {
    serviceName: string;
    port: number;
    loggerLevel: string;
    db: PgConfig;
}
export interface PgConfig {
    user: string;
    database: string;
    password: string;
    host: string;
    port: number;
    max: number;
    idleTimeoutMillis: number;
}
//# sourceMappingURL=index.d.ts.map