import "reflect-metadata"
import path from "path";
import { DataSource } from "typeorm"
import * as entities from "../models"
import { config } from "dotenv";
import { env } from 'node:process';
config()

let HOST = env.POSTGRES_HOST_DEVELOPMENT
let PORT_DB = env.POSTGRES_PORT_DEVELOPMENT
let USERNAME = env.POSTGRES_USERNAME_DEVELOPMENT
let PASSWORD = env.POSTGRES_PASSWORD_DEVELOPMENT
let DATABASE = env.POSTGRES_DATABASE_DEVELOPMENT

let MIGRATIONS = [path.join(__dirname, "../database/migrations/*.{ts,js}")];

if (env.NODE_ENV === "production") {
    HOST = env.POSTGRES_HOST_PRODUCTION
    PORT_DB = env.POSTGRES_PORT_PRODUCTION
    USERNAME = env.POSTGRES_USERNAME_PRODUCTION
    PASSWORD = env.POSTGRES_PASSWORD_PRODUCTION
    DATABASE = env.POSTGRES_DATABASE_PRODUCTION
}

export const conection = new DataSource({
    type: "postgres",
    host: HOST,
    port: Number(PORT_DB),
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    logging: false,
    entities: Object.values(entities),
    migrations: MIGRATIONS,
    extra: {
        timezone: "America/Sao_Paulo"
    }
})
