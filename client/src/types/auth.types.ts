export type UserRole = 'ADMIN' | 'SALES';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  token?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}
