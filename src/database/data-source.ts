import "reflect-metadata"
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm"
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

const paramsToConect: DataSourceOptions = {
    type: "postgres",
    host: HOST,
    port: Number(PORT_DB),
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    logging: true,
    entities: Object.values(entities),
    migrations: MIGRATIONS,
    extra: {
        timezone: "America/Sao_Paulo"
    }
}

export const conection = new DataSource(paramsToConect)
