import { FastifyInstance } from "fastify";
import {
  createOneSchema,
  deleteOneSchema,
  getAllSchema,
  updateOneSchema,
} from "./validation";
import { createOne, deleteOne, getAll, updateOne } from "./controller";

export default function routes(server: FastifyInstance) {
  server.get("/", { schema: getAllSchema }, getAll);
  server.post("/", { schema: createOneSchema }, createOne);
  server.put("/:id", { schema: updateOneSchema }, updateOne);
  server.delete("/:id", { schema: deleteOneSchema }, deleteOne);
}
