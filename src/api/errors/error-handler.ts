import {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import errorCodes from "./error-codes";
import {
  ErrorResponse,
  ValidationError,
  ValidationErrorResponse,
} from "@api/types";

function fstValidationErrorToResponse(
  error: FastifyError
): ValidationErrorResponse {
  const errors: Record<string, ValidationError[]> = {};

  error.validation!.forEach((err) => {
    const path = err.instancePath.replace("/", "");

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
    error: "Validation Error",
    message: error.message,
    errors,
  };
}

const errorHandler: FastifyInstance["errorHandler"] = function (
  this: FastifyInstance,
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error.code === errorCodes.FST_ERR_VALIDATION) {
    return reply.send(fstValidationErrorToResponse(error));
  }

  if (!error.statusCode || error.statusCode >= 500) {
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
  }

  return reply.code(error.statusCode || 500).send({
    error: error.name,
    message: error.message,
  } as ErrorResponse);
};

export default errorHandler;
