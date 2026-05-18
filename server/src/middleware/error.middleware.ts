import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { ENV } from '../config/env';

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    // We only expose stack trace in development for security
    stack: ENV.NODE_ENV === 'production' ? null : err.stack,
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new ApiError(404, `Not Found - ${req.originalUrl}`);
  next(error);
};
