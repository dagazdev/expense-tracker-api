import { env } from "node:process";

export function isDevelopment() {
  return (
    env.NODE_ENV === "dev" ||
    env.NODE_ENV === "development" ||
    env.NODE_ENV === undefined
  );
}

export function isProduction() {
  return env.NODE_ENV === "prod" || env.NODE_ENV === "production";
}
