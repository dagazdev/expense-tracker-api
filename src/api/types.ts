export type ValidationError = {
  message: string;
  code: string;
};

export interface ValidationErrorResponse {
  message: string;
  errors: Record<string, ValidationError[]>;
}

export interface InternalErrorResponse {
  message: string;
}
