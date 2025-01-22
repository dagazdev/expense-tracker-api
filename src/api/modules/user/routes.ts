import { FastifyInstance } from "fastify";
import z from "zod";
import { createUser, getUsers, updateUser } from "./controller";
import { createUserSchema, updateUserSchema } from "./validations";

function routes(server: FastifyInstance) {
  server.get("/", getUsers);
  server.post("/", { schema: createUserSchema }, createUser);
  server.put("/:user", { schema: updateUserSchema }, updateUser);
}

export default routes;
