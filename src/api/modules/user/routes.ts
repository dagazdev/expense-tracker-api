import { FastifyInstance } from "fastify";
import { createUser, getUsers, updateUser } from "./controller";
import { createUserSchema, updateUserSchema } from "./validations";
import bearerAuth from "@fastify/bearer-auth";
import authenticateBearer from "@lib/authenticate-bearer";

function routes(server: FastifyInstance) {
  server.register(bearerAuth, { keys: [], auth: authenticateBearer });

  server.get("/", getUsers);
  server.post("/", { schema: createUserSchema }, createUser);
  server.put("/:user", { schema: updateUserSchema }, updateUser);
}

export default routes;
