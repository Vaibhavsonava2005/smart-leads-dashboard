import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { UserRole } from '../interfaces/auth.interface';

// Generates a JWT valid for 30 days
export const generateToken = (id: string, role: UserRole): string => {
  return jwt.sign({ id, role }, ENV.JWT_SECRET, {
    expiresIn: '30d',
  });
};
