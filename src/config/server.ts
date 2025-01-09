import { env } from "node:process";

export const SERVER_PORT = parseInt(env.PORT || "3000");
