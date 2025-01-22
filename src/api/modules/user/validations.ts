import { FastifySchema } from "fastify";
import z from "zod";

const passwordSchema = z.string().min(6);

export const createUserSchema: FastifySchema = {
  body: z.object({
    name: z.string(),
    password: passwordSchema,
  }),
};

export const updateUserSchema: FastifySchema = {
  params: z.object({ user: z.coerce.number().int() }),
  body: z.object({
    name: z.optional(z.string()),
    password: z.optional(passwordSchema),
  }),
};
