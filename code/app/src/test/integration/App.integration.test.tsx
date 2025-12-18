import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import App from "../../App";
import AuthProvider from "../../contexts/Auth/AuthProvider";
import { DeviceProvider } from "../../contexts/Device/DeviceProvider";
import { ModalsProvider } from "../../components/ModalsProvider/ModalsProvider";
import { FirebaseAuthentication, FirebaseFirestore } from "../../services/capacitor";

function renderApp() {
  // Mirrors the real provider stack from `src/main.tsx`, but rendered in-process.
  return render(
    <MantineProvider>
      <ModalsProvider>
        <AuthProvider>
          <DeviceProvider>
            <App />
          </DeviceProvider>
        </AuthProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

describe("App integration", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("shows the sign-in screen when no user is present", async () => {
    // AuthProvider reads this on mount.
    vi.mocked(FirebaseAuthentication.getCurrentUser).mockResolvedValueOnce({
      user: null,
    } as never);

    renderApp();

    // With our i18n test mock, `t(key)` returns the key.
    expect(await screen.findByText("auth.sign_in")).toBeInTheDocument();
  });

  it("shows the default route when the user is signed in", async () => {
    vi.mocked(FirebaseAuthentication.getCurrentUser).mockResolvedValueOnce({
      user: { uid: "u1" },
    } as never);

    renderApp();

    // Default wearer route is DevicePage which shows this when no device is connected.
    expect(await screen.findByText("No device connected")).toBeInTheDocument();
    expect(screen.queryByText("auth.sign_in")).not.toBeInTheDocument();
  });

  it("renders wearer contacts from a Firestore snapshot", async () => {
    // Force initial route to contacts before the app reads localStorage.
    localStorage.setItem("currentRoute_wearer", "contacts");

    vi.mocked(FirebaseAuthentication.getCurrentUser).mockResolvedValueOnce({
      user: { uid: "u1" },
    } as never);

    // Simulate Firestore listeners used by both `useRelatives` and `ContactsPage`.
    vi.mocked(FirebaseFirestore.addCollectionSnapshotListener).mockImplementation(
      (opts: unknown, callback: (event: unknown) => void) => {
        const reference = (opts as { reference?: string }).reference ?? "";

        // ContactsPage listens here (note the plural "users/").
        if (reference === "users/u1/relatives") {
          callback({
            snapshots: [
              {
                id: "rel-1",
                data: { phone: "+4512345678", name: "Bob" },
              },
            ],
          });
          return Promise.resolve("cbid-users-relatives");
        }

        // `useRelatives` listens here (note the singular "user/").
        callback({ snapshots: [] });
        return Promise.resolve(`cbid-${reference}`);
      }
    );

    renderApp();

    // Contacts page header comes from translation keys.
    expect(await screen.findByText("navigation.contacts")).toBeInTheDocument();
    // ContactCard should render the number (parsed) and the name.
    expect(await screen.findByText("+4512345678")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });
});
