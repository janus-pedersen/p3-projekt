import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, MantineProvider, virtualColor } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "./index.css";
import AuthProvider from "./contexts/Auth/AuthProvider";
import { DeviceProvider } from "./contexts/Device/DeviceProvider";

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

import "./firebase";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
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
  </MantineProvider>
);
