import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../interfaces/auth.interface';
import { ApiError } from '../utils/ApiError';

// Strictly ensures the user has one of the allowed roles
export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, 'Not authorized'));
    }
    
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'User role is not authorized to access this route'));
    }
    
    next();
  };
};
