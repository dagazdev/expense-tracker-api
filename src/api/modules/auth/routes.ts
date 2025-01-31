import { FastifyInstance } from "fastify";
import { signUp, singIn } from "./controller";
import { sighInSchema, singUpSchema } from "./validation";

function routes(server: FastifyInstance) {
  server.post("/signup", { schema: singUpSchema }, signUp);
  server.post("/signin", { schema: sighInSchema }, singIn);
}

export default routes;
