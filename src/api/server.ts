import Fastify from "fastify";
import { SERVER_PORT } from "@config/server";
import { isDevelopment } from "@config/globals";

const server = Fastify({ logger: isDevelopment() });

server.get("/", () => {
  return { message: "hello world" };
});

export async function start() {
  try {
    await server.listen({ port: SERVER_PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
