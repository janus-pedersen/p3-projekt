import { Contact, CalendarClock, Map } from "lucide-react";
import { UserAvatar } from "../components/UserAvatar/UserAvatar";
import { ProfilePage } from "./Profile";
import { AlertsPage } from "./relative/AlertsPage";
import { ContactsPage } from "./responder/ContactsPage";
import { DevicePage } from "./responder/DevicePage";
import { SchedulePage } from "./responder/SchedulePage";
import { MapPage } from "./relative/MapPage";
import { DeviceIcon } from "../components/DeviceIcon/DeviceIcon";
import { AlertIcon } from "../components/AlertIcon/AlertIcon";

const profileRoute = {
  label: "navigation.profile",
  icon: (active: boolean) => <UserAvatar size={"md"} active={active} />,
  component: <ProfilePage />,
};

const wearerRoutes = {
  device: {
    label: "navigation.device",
    icon: <DeviceIcon />,
    component: <DevicePage />,
  },
  contacts: {
    label: "navigation.contacts",
    icon: <Contact size={24} />,
    component: <ContactsPage />,
  },
  schedule: {
    label: "navigation.schedule",
    icon: <CalendarClock size={24} />,
    component: <SchedulePage />,
  },
  profile: profileRoute,
};

const guardianRoutes = {
  alerts: {
    label: "navigation.alerts",
    icon: <AlertIcon />,
    component: <AlertsPage />,
  },
  map: {
    label: "navigation.map",
    icon: <Map />,
    component: <MapPage />,
  },
  profile: profileRoute,
};

export { wearerRoutes as relativeRoutes, guardianRoutes as responderRoutes };
