import { NextFunction, Request, Response } from 'express';

export const errorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
  // Log the error for debugging (omit sensitive details in production)
  console.error('Error:', {
    message: error.message || 'No message',
    stack: error.stack || 'No stack',
    status: error.status || 'No status',
  });
  const statusCode = error.status || 500;
  const errorMessage = error.message || 'An unexpected error occurred.';
  response.status(statusCode).json({ error: errorMessage });
};