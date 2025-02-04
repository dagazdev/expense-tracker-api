import { PostgresDataSource } from "@database/data-source";
import Movement from "@database/entities/Movement";
import { MovementFieldTypeType } from "@database/types";
import { FastifyReply, FastifyRequest } from "fastify";

const movementRepo = PostgresDataSource.getRepository(Movement);

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  const movements = await movementRepo.find({
    where: {
      userId: request.user.id,
    },
  });

  return reply.send({
    message: "Movements retrieved successfully",
    data: movements,
  });
}

export async function createOne(
  request: FastifyRequest<{
    Body: {
      type: MovementFieldTypeType;
      description?: string;
      value: number;
    };
  }>,
  reply: FastifyReply
) {
  const { type, description, value } = request.body;

  const movement = new Movement();
  movement.type = type;
  movement.description = description || "";
  movement.value = value;
  movement.user = request.user;

  await movementRepo.save(movement);

  return reply.send({
    message: "Movement created successfully",
    data: {
      id: movement.id,
      type: movement.type,
      description: movement.description,
      value: movement.value,
      createdAt: movement.createdAt,
      updatedAt: movement.updatedAt,
    },
  });
}

export async function updateOne(
  request: FastifyRequest<{
    Params: { id: number };
    Body: {
      type?: MovementFieldTypeType;
      description?: string;
      value?: number;
    };
  }>,
  reply: FastifyReply
) {
  const { type, description, value } = request.body;

  const movement = await movementRepo.findOneBy({
    id: request.params.id,
    userId: request.user.id,
  });

  if (!movement) {
    return reply.notFound(
      `Movement with id ${request.params.id} for the User with id ${
        request.user.id
      } was not found`
    );
  }

  movement.type = type || movement.type;
  movement.description = description || movement.description;
  movement.value = value || movement.value;

  await movementRepo.save(movement);

  return reply.send({
    message: "Movement updated successfully",
    data: movement,
  });
}

export async function deleteOne(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  const result = await movementRepo.delete({
    id: request.params.id,
    userId: request.user.id,
  });

  if (!result.affected || result.affected === 0) {
    return reply.notFound(
      `Movement with id ${request.params.id} for the User with id ${
        request.user.id
      } was not found`
    );
  }

  return reply.send({
    message: "Movement deleted successfully",
  });
}
