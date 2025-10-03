import { useContext } from "react";
import {
  AuthContext,
  type AuthContextType,
} from "../contexts/Auth/AuthContext";

export const useAuth = () => {
  return useContext(AuthContext) as NonNullable<AuthContextType>;
};
