import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

function createMemoryStorage(): Storage {
  const store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, String(value));
    },
  };
}

Object.defineProperty(window, "localStorage", {
  value: createMemoryStorage(),
  configurable: true,
});

Object.defineProperty(window, "sessionStorage", {
  value: createMemoryStorage(),
  configurable: true,
});

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).ResizeObserver = ResizeObserverMock;

vi.mock("../services/capacitor", () => {
  const listenerHandle = { remove: vi.fn() };

  return {
    BackgroundGeolocation: {
      addWatcher: vi.fn().mockResolvedValue("watcher-id"),
      removeWatcher: vi.fn(),
      openSettings: vi.fn(),
    },
    BleClient: {
      initialize: vi.fn(),
      stopLEScan: vi.fn(),
      requestLEScan: vi.fn(),
      connect: vi.fn(),
      disconnect: vi.fn(),
      getDevices: vi.fn().mockResolvedValue([]),
      read: vi.fn(),
      startNotifications: vi.fn(),
    },
    Contacts: {
      checkPermissions: vi.fn().mockResolvedValue({ contacts: "granted" }),
      requestPermissions: vi.fn().mockResolvedValue({ contacts: "granted" }),
      pickContact: vi.fn().mockResolvedValue({ contact: { phones: [] } }),
      getContacts: vi.fn().mockResolvedValue({ contacts: [] }),
    },
    Dialog: {
      alert: vi.fn().mockResolvedValue(undefined),
      prompt: vi.fn().mockResolvedValue({ cancelled: true, value: "" }),
    },
    FirebaseAuthentication: {
      getCurrentUser: vi.fn().mockResolvedValue({ user: null }),
      signInWithCustomToken: vi.fn().mockResolvedValue({ user: null }),
      signOut: vi.fn().mockResolvedValue(undefined),
    },
    FirebaseFirestore: {
      addDocument: vi.fn(),
      setDocument: vi.fn(),
      deleteDocument: vi.fn(),
      addCollectionSnapshotListener: vi.fn(),
      removeSnapshotListener: vi.fn(),
    },
    FirebaseFunctions: {
      callByName: vi.fn(),
    },
    Geolocation: {
      getCurrentPosition: vi.fn().mockResolvedValue({
        coords: { latitude: 0, longitude: 0 },
      }),
    },
    Keyboard: {
      addListener: vi.fn().mockResolvedValue(listenerHandle),
      removeAllListeners: vi.fn(),
    },
    LocalNotifications: {
      schedule: vi.fn().mockResolvedValue(undefined),
    },
    PhoneType: { Mobile: "mobile" },
    ScanMode: { SCAN_MODE_LOW_LATENCY: 2 },
  };
});

vi.mock("@vis.gl/react-google-maps", async () => {
  const React = await import("react");
  return {
    APIProvider: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    Map: ({ children }: { children: React.ReactNode }) =>
      React.createElement("div", { "data-testid": "google-map" }, children),
  };
});
