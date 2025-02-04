import { FastifySchema } from "fastify";
import z from "zod";

// the values of the schema must match with the allowed values for this field
// in the movements table
const movementTypeSchema = z.enum(["income", "expense", "transfer"]);

export const getAllSchema: FastifySchema = {};

export const createOneSchema: FastifySchema = {
  body: z.object({
    type: movementTypeSchema,
    description: z.optional(z.string()),
    value: z.number(),
  }),
};

export const updateOneSchema: FastifySchema = {
  params: z.object({
    id: z.coerce.number().int(),
  }),
  body: z.object({
    type: z.optional(movementTypeSchema),
    description: z.optional(z.string()),
    value: z.optional(z.number()),
  }),
};

export const deleteOneSchema: FastifySchema = {
  params: z.object({
    id: z.coerce.number().int(),
  }),
};
