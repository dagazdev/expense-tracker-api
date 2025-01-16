import { FastifyInstance } from "fastify";
import userRoutes from "@api/modules/user/routes";

function routes(server: FastifyInstance) {
  server.register(userRoutes, { prefix: "users" });
}

export default routes;
