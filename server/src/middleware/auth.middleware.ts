import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { User } from '../models/user.model';
import { ApiError } from '../utils/ApiError';
import { JwtPayload, IUser } from '../interfaces/auth.interface';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decode the token and verify signature
      const decoded = jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;

      // Attach user to request (excluding password)
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return next(new ApiError(401, 'User not found'));
      }
      
      req.user = user;
      next();
    } catch (error) {
      return next(new ApiError(401, 'Not authorized, token failed'));
    }
  }

  if (!token) {
    return next(new ApiError(401, 'Not authorized, no token'));
  }
};
