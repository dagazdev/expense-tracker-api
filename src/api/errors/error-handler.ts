import {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import errorCodes from "./error-codes";
import { InternalErrorResponse, ValidationError, ValidationErrorResponse } from "@api/types";

function fstValidationErrorToResponse(
  error: FastifyError
): ValidationErrorResponse {
  const errors: Record<string, ValidationError[]> = {};

  error.validation!.forEach((err) => {
    const path = err.instancePath.replace("/", "").replaceAll("/", ".");

    if (path in errors) {
      errors[path].push({
        code: err.keyword,
        message: err.message!,
      });
    } else {
      errors[path] = [
        {
          code: err.keyword,
          message: err.message!,
        },
      ];
    }
  });

  return {
    message: "Validation Error.",
    errors,
  };
}

const errorHandler: FastifyInstance["errorHandler"] = function (
  this: FastifyInstance,
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  switch (error.code) {
    case errorCodes.FST_ERR_VALIDATION:
      reply.code(400).send(fstValidationErrorToResponse(error));
      break;

    default:
      this.log.error(
        {
          request: {
            method: request.method,
            url: request.url,
            headers: request.headers,
            body: request.body,
            params: request.params,
            query: request.query,
          },
          error,
        },
        "Unhandled error occurred."
      );

      reply.code(error.statusCode || 500).send({
        message: "An unexpected error occurred while processing your request."
      } as InternalErrorResponse);
      break;
  }
};

export default errorHandler;
