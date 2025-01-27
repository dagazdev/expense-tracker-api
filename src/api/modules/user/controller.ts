import { PostgresDataSource } from "@database/data-source";
import User from "@database/entities/User";
import { FastifyReply, FastifyRequest } from "fastify";

const userRepository = PostgresDataSource.getRepository(User);

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
  const users = await userRepository.find();

  return reply.send(users);
}

export async function createUser(
  request: FastifyRequest<{ Body: { name: string; password: string } }>,
  reply: FastifyReply
) {
  const { name, password } = request.body;

  const newUser = new User();
  newUser.name = name;
  newUser.password = password;
  const storedUser = await userRepository.save(newUser);

  return reply.send(storedUser);
}

export async function updateUser(
  request: FastifyRequest<{
    Params: { user: number };
    Body: { name?: string; password?: string };
  }>,
  reply: FastifyReply
) {
  const userId = request.params.user;
  const { name: newName, password: newPass } = request.body;

  const userToUpdate = await userRepository.findOneBy({
    id: userId,
  });

  if (!userToUpdate) {
    return reply.notFound();
  }

  userToUpdate.name = newName || userToUpdate.name;
  userToUpdate.password = newPass || userToUpdate.password;

  const updatedUser = await userRepository.save(userToUpdate);

  return reply.send(updatedUser);
}
