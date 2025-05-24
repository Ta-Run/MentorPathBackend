export class MentorError extends Error {
  status: number;
  error?: unknown;

  constructor(status: number = 500, message: string = 'An error occurred', error?: unknown) {
    super(message.charAt(0).toUpperCase() + message.slice(1).toLowerCase());
    this.status = status;
    this.error = error;

    // Maintain proper stack trace (only available in V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MentorError);
    }
  }
}