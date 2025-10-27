import {
  Contact,
  CalendarClock,
  MessageSquareWarning,
  Map,
} from "lucide-react";
import { UserAvatar } from "../components/UserAvatar/UserAvatar";
import { ProfilePage } from "./Profile";
import { AlertsPage } from "./relative/AlertsPage";
import { ContactsPage } from "./responder/ContactsPage";
import { DevicePage } from "./responder/DevicePage";
import { SchedulePage } from "./responder/SchedulePage";
import { MapPage } from "./relative/MapPage";
import { DeviceIcon } from "../components/DeviceIcon/DeviceIcon";

const profileRoute = {
  label: "Profile",
  icon: (active: boolean) => <UserAvatar size={"md"} active={active} />,
  component: <ProfilePage />,
};

const wearerRoutes = {
  device: {
    label: "Device",
    icon: <DeviceIcon />,
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
  profile: profileRoute,
};

const guardianRoutes = {
  alerts: {
    label: "Alerts",
    icon: <MessageSquareWarning />,
    component: <AlertsPage />,
  },
  map: {
    label: "Map",
    icon: <Map />,
    component: <MapPage />,
  },
  profile: profileRoute,
};

export { wearerRoutes as relativeRoutes, guardianRoutes as responderRoutes };
