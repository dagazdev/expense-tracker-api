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
import bearerAuth from "@fastify/bearer-auth";
import authenticateBearer from "@lib/authenticate-bearer";
import authRoutes from "@api/modules/auth/routes";
import User from "@database/entities/User";
import movementRoutes from "@api/modules/movements/routes";

declare module "fastify" {
  interface FastifyRequest {
    user?: User;
  }
}

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

server.decorateRequest<User | undefined>("user", undefined);

// public routes
server.register(authRoutes, { prefix: "api" });

// protected routes must be register
// after the hook
server.register((server) => {
  server.register(bearerAuth, {
    keys: [],
    auth: authenticateBearer,
    errorResponse: (err) => ({
      error: "UnauthorizedError",
      message: err.message,
    }),
  });

  server.register(movementRoutes, { prefix: "api/movements" });
});

export async function start() {
  try {
    await server.listen({ port: SERVER_PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
