import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import sensible from "@fastify/sensible";
import { SERVER_PORT } from "@config/server";
import { isDevelopment } from "@config/globals";
import { PostgresDataSource } from "@database/data-source";
import errorHandler from "@api/errors/error-handler";
import userRoutes from "@api/modules/user/routes";
import authRoutes from "@api/modules/auth/routes";

const server = Fastify({
  logger: isDevelopment() && { transport: { target: "pino-pretty" } },
});

server.register(sensible);

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler(errorHandler);

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

server.register(userRoutes, { prefix: "api/users" });
server.register(authRoutes, { prefix: "api" });

export async function start() {
  try {
    await server.listen({ port: SERVER_PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
