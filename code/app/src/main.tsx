import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createTheme,
  Indicator,
  MantineProvider,
  virtualColor,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "./index.css";
import AuthProvider from "./contexts/Auth/AuthProvider";
import { Watch, Contact, CalendarClock } from "lucide-react";
import { RoutesProvider } from "./contexts/Routes/RoutesProvider";
import { UserAvatar } from "./components/UserAvatar/UserAvatar";
import { ProfilePage } from "./pages/Profile";

import { ContactsPage } from "./pages/ContactsPage";
import { DeviceProvider } from "./contexts/Device/DeviceProvider";
import { DevicePage } from "./pages/DevicePage";
import { SchedulePage } from "./pages/SchedulePage";

const theme = createTheme({
  colors: {
    primary: virtualColor({
      name: "primary",
      dark: "blue",
      light: "blue",
    }),
  },

  defaultRadius: "md",
  respectReducedMotion: false,
  focusRing: "auto",
});

const routes = {
  device: {
    label: "Device",
    icon: (
      <Indicator processing color="red">
        <Watch size={24} />
      </Indicator>
    ),
    component: <DevicePage />,
  },
  contacts: {
    label: "Contacts",
    icon: <Contact size={24} />,
    component: <ContactsPage />,
  },
  schedule: {
    label: "Schedule",
    icon: <CalendarClock size={24} />,
    component: <SchedulePage />,
  },
  profile: {
    label: "Profile",
    icon: (active: boolean) => <UserAvatar size={"md"} active={active} />,
    component: <ProfilePage />,
  },
};

import "./firebase";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
    <AuthProvider>
      <DeviceProvider>
        <RoutesProvider routes={routes}>
          <Notifications
            position="top-center"
            limit={5}
            style={{
              width: "100%",
              left: 0,
              transform: "none",
            }}
          />
          <App />
        </RoutesProvider>
      </DeviceProvider>
    </AuthProvider>
  </MantineProvider>
);
