import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createTheme,
  MantineProvider,
  Text,
  virtualColor,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "./index.css";
import AuthProvider from "./contexts/Auth/AuthProvider";
import { Watch, Contact, CalendarClock } from "lucide-react";
import { RoutesProvider } from "./contexts/Routes/RoutesProvider";
import { UserAvatar } from "./components/UserAvatar/UserAvatar";
import { ProfilePage } from "./pages/Profile";

const theme = createTheme({
  colors: {
    primary: virtualColor({
      name: "primary",
      dark: "blue",
      light: "blue",
    }),
  },
  defaultRadius: "md",
  // Ensure transitions are enabled globally
  respectReducedMotion: false,
  focusRing: "auto",
});

const routes = {
  device: {
    icon: <Watch size={20} />,
    component: <Text>Device Page</Text>,
  },
  contacts: {
    icon: <Contact size={20} />,
    component: <Text>Contacts Page</Text>,
  },
  schedule: {
    icon: <CalendarClock size={20} />,
    component: <Text>Schedule Page</Text>,
  },
  profile: {
    icon: (active: boolean) => <UserAvatar active={active} />,
    component: <ProfilePage />,
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
    <AuthProvider>
      <RoutesProvider routes={routes}>
        <App />
      </RoutesProvider>
    </AuthProvider>
  </MantineProvider>
);
