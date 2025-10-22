import { AppShell, Stack, useMantineColorScheme } from "@mantine/core";
import { useContext, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "./components/Outlet/Outlet";
import SignInPage from "./pages/SignIn";
import { Keyboard } from "@capacitor/keyboard";
import { AnimatePresence, motion } from "motion/react";
import { RouteContext } from "./contexts/Routes/RouteContext";

function App() {
  const { setColorScheme } = useMantineColorScheme();
  useEffect(() => {
    setColorScheme("auto");
  }, [setColorScheme]);

  const { user } = useAuth();

  const { currentRoute } = useContext(RouteContext)!;

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
    <AppShell
      padding="md"
      className="app-shell-root"
      pos={"fixed"}
      display={"flex"}
    >
      <AppShell.Main style={{ flexGrow: 1 }} w={"100vw"}>
        {!user && <SignInPage />}

        {user && (
          <AnimatePresence propagate mode={"wait"}>
            <motion.div
              key={currentRoute}
              style={{ width: "100%", height: "100vh" }}
            >
              <Stack m={"lg"} mt={0} pb={150}>
                <Outlet />
              </Stack>
            </motion.div>
          </AnimatePresence>
        )}
      </AppShell.Main>
      <AppShell.Footer hidden={!user}>
        <Navbar />
      </AppShell.Footer>
    </AppShell>
  );
}

export default App;
