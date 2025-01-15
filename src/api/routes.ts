import { PostgresDataSource } from "@database/data-source";
import User from "@database/entities/User";
import { FastifyInstance } from "fastify";

function routes(server: FastifyInstance) {
  server.get("/api", (_, rep) => {
    return rep.send({ message: "hello world" });
  });
  server.get("/test", async () => {
    const userRepository = PostgresDataSource.getRepository(User);

    const user = new User();
    user.name = "foo";
    user.password = "passwd";

    await userRepository.save(user);

    return await userRepository.find();
  });
}

export default routes;
