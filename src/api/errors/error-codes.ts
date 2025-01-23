import { errorCodes as fstErrorcodes } from "fastify";

const errorCodes: Record<string, string> = {};

Object.keys(fstErrorcodes).forEach((code) => {
  errorCodes[code] = code;
});

export default errorCodes as Record<
  keyof typeof fstErrorcodes,
  keyof typeof fstErrorcodes
>;
