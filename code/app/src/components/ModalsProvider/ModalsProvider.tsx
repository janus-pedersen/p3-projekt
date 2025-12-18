import { GuardianModal } from "../../modals/GuardianModal";
import { ModalsProvider as MantineModalsProvider } from "@mantine/modals";
import { Keyboard } from "../../services/capacitor";
import { useEffect, useState } from "react";

const modals = {
  guardian: GuardianModal,
} as const;

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}

export function ModalsProvider(props: React.PropsWithChildren) {
  const [keyboard, setKeyboard] = useState<boolean>(false);

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", () => setKeyboard(true));
    Keyboard.addListener("keyboardWillHide", () => setKeyboard(false));

    return () => {
      Keyboard.removeAllListeners();
    };
  }, []);

  return (
    <MantineModalsProvider
      modals={modals}
      modalProps={{
        withCloseButton: false,
        centered: !keyboard,
        transitionProps: {
          transition: "slide-down",
        },
        style: {
          transition: "all 0.2s ease-in-out",
        },
        yOffset: keyboard ? `150` : undefined,
      }}
    >
      {props.children}
    </MantineModalsProvider>
  );
}
