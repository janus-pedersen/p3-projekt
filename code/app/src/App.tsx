import { AppShell, useMantineColorScheme } from "@mantine/core";
import { useEffect } from "react";
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

          {/* <AnimatePresence mode="wait" initial={false}>
          {user && (
            <motion.div
              key={currentRoute} // ensures remount on route change
              initial={{ opacity: 0 }} // animate in
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} // animate out
              style={{ width: "100%", height: "100vh" }}
              onAnimationComplete={(definition) => {
                if (definition === "exit") {
                  setDisplayedPage(currentRoute);
                }
              }}
            >
              <Outlet route={displayedPage} />
            </motion.div>
          )}
        </AnimatePresence> */}
          <Outlet />
        </AppShell.Main>
        <AppShell.Footer hidden={!user}>
          <Navbar />
        </AppShell.Footer>
      </AppShell>
    </RoutesProvider>
  );
}

export default App;
