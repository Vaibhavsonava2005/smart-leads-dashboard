import { Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'ADMIN',
  SALES = 'SALES',
}

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface JwtPayload {
  id: string;
  role: UserRole;
}
