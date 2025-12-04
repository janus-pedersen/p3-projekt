import { AppShell, Center, Loader, useMantineColorScheme } from "@mantine/core";
import { Suspense, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "./components/Outlet/Outlet";
import SignInPage from "./pages/SignIn";
import { Keyboard } from "@capacitor/keyboard";
import { RoutesProvider } from "./contexts/Routes/RoutesProvider";
import { relativeRoutes, responderRoutes } from "./pages";

function App() {
  const { setColorScheme } = useMantineColorScheme();
  useEffect(() => {
    setColorScheme("auto");
  }, [setColorScheme]);

  const { user } = useAuth();

  useEffect(() => {
    const updatePadding = (info: { keyboardHeight: number }) => {
      document.documentElement.style.setProperty(
        "--keyboard-padding",
        info.keyboardHeight + "px"
      );
    };

    Keyboard.addListener("keyboardWillShow", updatePadding);
    Keyboard.addListener("keyboardWillHide", () => {
      document.documentElement.style.setProperty("--keyboard-padding", "0px");
    });
  }, []);

  return (
    <RoutesProvider
      routes={{
        wearer: relativeRoutes,
        guardian: responderRoutes,
      }}
    >
      <AppShell padding="md" className="app-shell-root" display={"flex"}>
        <AppShell.Main style={{ flexGrow: 1 }} w={"100vw"} pb={"150px"}>
          {!user && <SignInPage />}
          {user && <Outlet />}
        </AppShell.Main>
        <AppShell.Footer bg={"primary.8"} hidden={!user}>
          <Navbar />
        </AppShell.Footer>
      </AppShell>
    </RoutesProvider>
  );
}

export default function WrappedApp() {
  return (
    <Suspense
      fallback={
        <Center h={"100vh"}>
          <Loader />
        </Center>
      }
    >
      <App />
    </Suspense>
  );
}
