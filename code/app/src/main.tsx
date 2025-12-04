import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, MantineProvider, virtualColor } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import AuthProvider from "./contexts/Auth/AuthProvider";
import { DeviceProvider } from "./contexts/Device/DeviceProvider";
import "./index.scss";
import "./i18n";

const theme = createTheme({
  colors: {
    primary: virtualColor({
      name: "primary",
      dark: "teal",
      light: "teal",
    }),
  },

  primaryColor: "primary",

  defaultRadius: "md",
  respectReducedMotion: false,
  focusRing: "auto",
});

import "./firebase";
import { ModalsProvider } from "./components/ModalsProvider/ModalsProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
    <ModalsProvider>
      <AuthProvider>
        <DeviceProvider>
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
        </DeviceProvider>
      </AuthProvider>
    </ModalsProvider>
  </MantineProvider>
);
