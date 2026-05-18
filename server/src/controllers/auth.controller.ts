import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = await authService.registerUser(req.body);
    res.status(201).json({ success: true, data: userData });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = await authService.loginUser(req.body);
    res.status(200).json({ success: true, data: userData });
  } catch (error) {
    next(error);
  }
};

// Get current user profile based on token
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ success: true, data: req.user });
  } catch (error) {
    next(error);
  }
};
