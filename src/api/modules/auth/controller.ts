import AccessToken from "@database/entities/AccessToken";
import User from "@database/entities/User";
import AccessTokenRepository from "@database/repositories/AccessTokenRepository";
import UserRepository from "@database/repositories/UserRepository";
import createToken from "@lib/create-token";
import { FastifyReply, FastifyRequest } from "fastify";

const userRepo = new UserRepository();
const tokenRepo = new AccessTokenRepository();

export async function signUp(
  request: FastifyRequest<{ Body: { name: string; password: string } }>,
  reply: FastifyReply
) {
  const user = new User();
  user.name = request.body.name;
  user.password = request.body.password;

  return reply.code(201).send(await userRepo.save(user));
}

export async function singIn(
  request: FastifyRequest<{ Body: { name: string; password: string } }>,
  reply: FastifyReply
) {
  const user = await userRepo.findOne({
    relations: {
      tokens: true,
    },
    where: {
      name: request.body.name,
      password: request.body.password,
    },
  });

  if (!user) {
    return reply.unauthorized("Name or password mismatch");
  }

  if (user.tokens.length > 0) {
    await tokenRepo.delete(user.tokens.map((tk) => tk.id));
  }

  const rawToken = createToken();

  const newToken = new AccessToken();
  newToken.token = rawToken;
  newToken.user = user;

  await tokenRepo.save(newToken);

  return reply.send({
    message: "New session created",
    token: `${user.id}.${rawToken}`,
  });
}
