export interface ErrorResponse {
  error: string;
  message: string;
}

export type ValidationError = {
  message: string;
  code: string;
};

export interface ValidationErrorResponse extends ErrorResponse {
  errors: Record<string, ValidationError[]>;
}
