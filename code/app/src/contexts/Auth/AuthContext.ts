import type { User } from "@capacitor-firebase/authentication";
import { createContext } from "react";

export interface AuthContextType {
  user: User | null;

  getCode(phone: string): Promise<unknown>;
  verifyCode(phone: string, code: string): Promise<string>;

  signOut(): Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
