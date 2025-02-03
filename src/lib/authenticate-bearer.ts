import { PostgresDataSource } from "@database/data-source";
import User from "@database/entities/User";
import { FastifyRequest } from "fastify";

const userRepository = PostgresDataSource.getRepository(User);

async function authenticateBearer(
  key: string,
  request: FastifyRequest
): Promise<boolean> {
  if (key.match(/^\d+\.[a-z0-9]+$/) === null) {
    return false;
  }

  const [userId, token] = key.split(".");

  const user = await userRepository.findOne({
    relations: {
      tokens: true,
    },
    where: {
      id: Number(userId),
    },
  });

  if (!user) {
    return false;
  }

  const userHasSession =
    user.tokens.find((tk) => tk.token === token) !== undefined;

  if (userHasSession) {
    request.user = user;

    return true;
  }

  return false;
}

export default authenticateBearer;
