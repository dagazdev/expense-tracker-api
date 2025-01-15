import Fastify from "fastify";
import { SERVER_PORT } from "@config/server";
import { isDevelopment } from "@config/globals";
import routes from "@api/routes";
import { PostgresDataSource } from "@database/data-source";

const server = Fastify({
  logger: isDevelopment() && { transport: { target: "pino-pretty" } },
});

server.addHook("onReady", (done) => {
  PostgresDataSource.initialize().then(() => {
    console.log("Database connected.");
    done();
  });
});

server.addHook("onClose", (_, done) => {
  PostgresDataSource.destroy().then(() => {
    console.log("Database connection closed.");
    done();
  });
});

server.register(routes);

export async function start() {
  try {
    await server.listen({ port: SERVER_PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
