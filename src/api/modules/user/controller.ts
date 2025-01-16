import { PostgresDataSource } from "@database/data-source";
import User from "@database/entities/User";
import { FastifyReply, FastifyRequest } from "fastify";

const userRepository = PostgresDataSource.getRepository(User);

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
  const users = await userRepository.find();

  return reply.send(users);
}

export async function createUser(
  request: FastifyRequest<{ Body: { name?: string; password?: string } }>,
  reply: FastifyReply
) {
  if (typeof request.body.name !== "string") {
    return reply.send({
      statusCode: 400,
      error: "Bad Request",
      message: "body property 'name' must be a string",
    });
  }

  if (typeof request.body.password !== "string") {
    return reply.send({
      statusCode: 400,
      error: "Bad Request",
      message: "body property 'password' must be a string",
    });
  }

  const newUser = new User();
  newUser.name = request.body.name;
  newUser.password = request.body.password;
  const storedUser = await userRepository.save(newUser);

  return reply.send(storedUser);
}

export async function updateUser(
  request: FastifyRequest<{
    Params: { user?: number };
    Body: { name?: string; password?: string };
  }>,
  reply: FastifyReply
) {
  if (typeof request.params.user !== "number") {
    return reply.send({
      statusCode: 400,
      error: "Bad Request",
      message: "parameter 'id' must be a string",
    });
  }

  const userToUpdate = await userRepository.findOneBy({
    id: request.params.user,
  });

  if (!userToUpdate) {
    return reply.send({
      statusCode: 404,
      error: "Not Found",
      message: "'user' with property 'id' value '1' not found",
    });
  }

  let dirty = false;

  if (request.body?.name) {
    if (typeof request.body.name !== "string") {
      return reply.send({
        statusCode: 400,
        error: "Bad Request",
        message: "body property 'name' must be a string",
      });
    } else {
      userToUpdate.name = request.body.name;
      dirty = true;
    }
  }

  if (request.body?.password) {
    if (typeof request.body.password !== "string") {
      return reply.send({
        statusCode: 400,
        error: "Bad Request",
        message: "body property 'password' must be a string",
      });
    } else {
      userToUpdate.password = request.body.password;
      dirty = true;
    }
  }

  if (dirty) {
    userToUpdate.updated_at = new Date();
    const updatedUser = await userRepository.save(userToUpdate);

    return reply.send(updatedUser);
  }

  return reply.send(userToUpdate);
}
