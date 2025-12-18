import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

if (!document.getElementById("root")) {
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);
}

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

vi.mock("react-dom/client", () => {
  return {
    default: {
      createRoot: vi.fn(() => ({ render: vi.fn() })),
    },
  };
});

vi.mock("react-i18next", () => {
  return {
    initReactI18next: {},
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: {
        language: "en",
        changeLanguage: vi.fn(),
      },
    }),
  };
});

vi.mock("i18next", () => {
  const i18nMock = {
    use: () => i18nMock,
    init: vi.fn().mockResolvedValue(undefined),
  };
  return { default: i18nMock };
});

vi.mock("i18next-browser-languagedetector", () => ({ default: {} }));
vi.mock("i18next-http-backend", () => ({ default: {} }));

vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(() => ({})),
}));

vi.mock("firebase/auth", () => ({
  browserLocalPersistence: {},
  getAuth: vi.fn(() => ({})),
  initializeAuth: vi.fn(() => ({})),
  signInWithCustomToken: vi.fn().mockResolvedValue({}),
}));

vi.mock("@capacitor/core", () => {
  return {
    registerPlugin: vi.fn(() => ({
      addWatcher: vi.fn().mockResolvedValue("watcher-id"),
      removeWatcher: vi.fn(),
      openSettings: vi.fn(),
    })),
  };
});

vi.mock("@capacitor/keyboard", () => {
  const listenerHandle = { remove: vi.fn() };
  return {
    Keyboard: {
      addListener: vi.fn().mockResolvedValue(listenerHandle),
      removeAllListeners: vi.fn(),
    },
  };
});

vi.mock("@capacitor/dialog", () => ({
  Dialog: {
    alert: vi.fn().mockResolvedValue(undefined),
    prompt: vi.fn().mockResolvedValue({ cancelled: true, value: "" }),
  },
}));

vi.mock("@capacitor/geolocation", () => ({
  Geolocation: {
    getCurrentPosition: vi.fn().mockResolvedValue({
      coords: { latitude: 0, longitude: 0 },
    }),
  },
}));

vi.mock("@capacitor/local-notifications", () => ({
  LocalNotifications: {
    schedule: vi.fn().mockResolvedValue(undefined),
  },
}));

vi.mock("@capacitor-community/bluetooth-le", () => ({
  BleClient: {
    initialize: vi.fn(),
    initializeClient: vi.fn(),
    stopLEScan: vi.fn(),
    requestLEScan: vi.fn(),
    connect: vi.fn(),
    disconnect: vi.fn(),
    getDevices: vi.fn().mockResolvedValue([]),
    read: vi.fn(),
    startNotifications: vi.fn(),
  },
  ScanMode: { SCAN_MODE_LOW_LATENCY: 2 },
}));

vi.mock("@capacitor-community/contacts", () => ({
  Contacts: {
    checkPermissions: vi.fn().mockResolvedValue({ contacts: "granted" }),
    requestPermissions: vi.fn().mockResolvedValue({ contacts: "granted" }),
    pickContact: vi.fn().mockResolvedValue({ contact: { phones: [] } }),
    getContacts: vi.fn().mockResolvedValue({ contacts: [] }),
  },
  PhoneType: { Mobile: "mobile" },
}));

vi.mock("@capacitor-firebase/authentication", () => ({
  FirebaseAuthentication: {
    getCurrentUser: vi.fn().mockResolvedValue({ user: null }),
    signInWithCustomToken: vi.fn().mockResolvedValue({ user: null }),
    signOut: vi.fn().mockResolvedValue(undefined),
  },
}));

vi.mock("@capacitor-firebase/firestore", () => ({
  FirebaseFirestore: {
    addDocument: vi.fn(),
    setDocument: vi.fn(),
    deleteDocument: vi.fn(),
    addCollectionSnapshotListener: vi.fn(),
    removeSnapshotListener: vi.fn(),
  },
}));

vi.mock("@capacitor-firebase/functions", () => ({
  FirebaseFunctions: {
    callByName: vi.fn(),
  },
}));

vi.mock("@vis.gl/react-google-maps", async () => {
  const React = await import("react");
  return {
    APIProvider: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    Map: ({ children }: { children: React.ReactNode }) =>
      React.createElement("div", { "data-testid": "google-map" }, children),
  };
});
