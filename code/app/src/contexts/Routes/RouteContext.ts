import { createContext } from "react";

export interface Route {
  //   name: string;
  label: string;
  component: React.ReactNode;
  icon: React.ReactNode | ((active: boolean) => React.ReactNode);
}

export type RouteContextType<R extends Record<string, Route>> = {
  routes: R;
  currentRoute: keyof R;
  setCurrentRoute(route: keyof R): void;
};

export const RouteContext = createContext<
  RouteContextType<Record<string, Route>> | undefined
>(undefined);
