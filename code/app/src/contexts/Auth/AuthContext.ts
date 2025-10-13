import type { User } from "@capacitor-firebase/authentication";
import { createContext } from "react";

export interface Relative {
  phone: string;
}

export interface AuthContextType {
  user: User | null;

  relatives: Relative[] | undefined;
  addRelative: (phone: string) => Promise<void>;
  removeRelative: (phone: string) => Promise<void>;

  getCode(phone: string): Promise<unknown>;
  verifyCode(phone: string, code: string): Promise<string>;

  signOut(): Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
