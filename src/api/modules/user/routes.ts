import { FastifyInstance } from "fastify";
import { createUser, getUsers, updateUser } from "./controller";

function routes(server: FastifyInstance) {
  server.get("/", getUsers);
  server.post(
    "/",
    // properties types seems to not work
    // {
    //   schema: {
    //     body: {
    //       type: "object",
    //       properties: {
    //         name: { type: "number" },
    //         password: { type: "string" },
    //       },
    //       required: ["name", "password"],
    //     },
    //   },
    // },
    createUser
  );
  server.put(
    "/:user",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            user: { type: "number" },
          },
        },
      },
    },
    updateUser
  );
}

export default routes;
