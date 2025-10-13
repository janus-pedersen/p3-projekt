import {
  AppShell,
  Center,
  Paper,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { SignIn } from "./components/SignIn/SignIn";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "./components/Outlet/Outlet";

function App() {
  const { setColorScheme } = useMantineColorScheme();
  useEffect(() => {
    setColorScheme("auto");
  }, [setColorScheme]);

  const { user } = useAuth();

  return (
    <AppShell
      padding="md"
      className="app-shell-root"
      pos={"fixed"}
      display={"flex"}
    >
      <AppShell.Main style={{ flexGrow: 1 }} w={"100vw"}>
        {!user && (
          <Center h={"100%"}>
            <Stack w={"90%"} maw={"500px"} gap={0}>
              <Title order={3}>Welcome to Lapsus</Title>
              <Text>Let's get you started!</Text>
              <Paper mt={"xl"} withBorder shadow={"md"} p={"md"}>
                <SignIn />
              </Paper>
            </Stack>
          </Center>
        )}

        {user && <Outlet />}
      </AppShell.Main>
      <AppShell.Footer hidden={!user}>
        <Navbar />
      </AppShell.Footer>
    </AppShell>
  );
}

export default App;
