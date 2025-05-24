import { NextFunction, Request, Response } from 'express';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

export const requestLogger = (request: Request, response: Response, next: NextFunction) => {
  const data={
    method: request.method,
    url: request.originalUrl,
    body: request.body,
    params: request.params,
    query: request.query,
  }
  logger.info(JSON.stringify(data));
  next();
};