import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createTheme,
  Indicator,
  MantineProvider,
  virtualColor,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "./index.css";
import AuthProvider from "./contexts/Auth/AuthProvider";
import { Watch, Contact, CalendarClock } from "lucide-react";
import { RoutesProvider } from "./contexts/Routes/RoutesProvider";
import { UserAvatar } from "./components/UserAvatar/UserAvatar";
import { ProfilePage } from "./pages/Profile";

import { initializeApp, type FirebaseOptions } from "firebase/app";
import firebaseConfig from "../firebase.config.json";
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
    icon: (
      <Indicator processing color="red">
        <Watch size={20} />
      </Indicator>
    ),
    component: <DevicePage />,
  },
  contacts: {
    icon: <Contact size={20} />,
    component: <ContactsPage />,
  },
  schedule: {
    icon: <CalendarClock size={20} />,
    component: <SchedulePage />,
  },
  profile: {
    icon: (active: boolean) => <UserAvatar active={active} />,
    component: <ProfilePage />,
  },
};

initializeApp(firebaseConfig as FirebaseOptions);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
    <AuthProvider>
      <DeviceProvider>
        <RoutesProvider routes={routes}>
          <App />
        </RoutesProvider>
      </DeviceProvider>
    </AuthProvider>
  </MantineProvider>
);
