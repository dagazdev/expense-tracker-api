import { env } from "node:process";

export const DB_NAME = env.DB_NAME || "expense_tracker";
export const DB_HOST = env.DB_HOST || "localhost";
export const DB_PORT = parseInt(env.DB_PORT || "5432");
export const DB_USERNAME = env.DB_USERNAME || "postgres";
export const DB_PASSWORD = env.DB_PASSWORD || "postgres";
