import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { SERVER_PORT } from "@config/server";
import { isDevelopment } from "@config/globals";
import { PostgresDataSource } from "@database/data-source";
import routes from "@api/modules/user/routes";

const server = Fastify({
  logger: isDevelopment() && { transport: { target: "pino-pretty" } },
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

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

server.register(routes, { prefix: "api/users" });

export async function start() {
  try {
    await server.listen({ port: SERVER_PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
