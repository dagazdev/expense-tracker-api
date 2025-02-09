import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from "@config/database";
import path from "node:path";
import { DataSource } from "typeorm";

const entitiesGlob = path.resolve(__dirname, "entities/*.{ts,js}");
const migrationsGlob = path.resolve(__dirname, "migrations/*.{ts,js}");

export const PostgresDataSource = new DataSource({
  type: "postgres",
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  entities: [entitiesGlob],
  migrations: [migrationsGlob],
  synchronize: false,
  logging: true,
});
