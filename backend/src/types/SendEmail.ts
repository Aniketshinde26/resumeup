export interface SendEmailOptions {
  email: string;
  subject: string;
  message: string;
}

export interface BrevoApiError extends Error {
  body?: {
    message?: string;
    code?: string;
  };
}
