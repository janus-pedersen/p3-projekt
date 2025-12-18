import type { User } from "../../services/capacitor";
import { createContext } from "react";

export interface AuthContextType {
  user?: User;
  updateUser: (user: Partial<User>) => Promise<void>;

  getCode(phone: string): Promise<unknown>;
  force(phone: string): Promise<unknown>;
  verifyCode(phone: string, code: string): Promise<string>;

  signOut(): Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
