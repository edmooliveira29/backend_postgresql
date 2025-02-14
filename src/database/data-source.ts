import "reflect-metadata"
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm"
import * as entities from "../models"
import { config } from "dotenv";
import { env } from 'node:process';
config()

let HOST = env.POSTGRES_HOST_DEVELOPMENT
let PORT_DB = env.POSTGRES_PORT
let USERNAME = env.POSTGRES_USERNAME_DEVELOPMENT
let PASSWORD = env.POSTGRES_PASSWORD_DEVELOPMENT
let DATABASE = env.POSTGRES_DATABASE_DEVELOPMENT

let MIGRATIONS = [path.join(__dirname, "../database/migrations/*.{ts,js}")];
let paramsToConect = {}
if (env.NODE_ENV === "production") {
    const databaseUrl = env.POSTGRES_DATABASE_URL_PRODUCTION;

    if (!databaseUrl) {
        throw new Error("DATABASE_URL não definida!");
    }
    paramsToConect = {
        type: "postgres",
        url: databaseUrl,
        logging: false,
        entities: Object.values(entities),
        migrations: MIGRATIONS,
        ssl: true,
        extra: {
            ssl: {
                rejectUnauthorized: false,
            },
            timezone: "America/Sao_Paulo",
        },
    }
} else {
    paramsToConect = {
        type: "postgres",
        host: HOST,
        port: PORT_DB,
        username: USERNAME,
        password: PASSWORD,
        database: DATABASE,
        logging: false,
        entities: Object.values(entities),
        migrations: MIGRATIONS,
        extra: {
            timezone: "America/Sao_Paulo",
        }
    }
}

export const conection = new DataSource(paramsToConect as DataSourceOptions)
