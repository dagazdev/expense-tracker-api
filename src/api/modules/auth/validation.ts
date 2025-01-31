import { FastifySchema } from "fastify";
import z from "zod";

const passwordSchema = z.string().min(6);

export const singUpSchema: FastifySchema = {
  body: z.object({
    name: z.string(),
    password: passwordSchema,
  }),
};

export const sighInSchema: FastifySchema = {
  body: z.object({
    name: z.string(),
    password: passwordSchema,
  }),
};
