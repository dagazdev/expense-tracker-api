import { PostgresDataSource } from "@database/data-source";
import User from "@database/entities/User";

const userRepository = PostgresDataSource.getRepository(User);

async function authenticateBearer(key: string): Promise<boolean> {
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

  return user.tokens.find((tk) => tk.token === token) !== undefined;
}

export default authenticateBearer;
