import {
  Box,
  Button,
  InputWrapper,
  PinInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { PhoneInput } from "../components/PhoneInput/PhoneInput";
import { AnimatePresence, motion } from "motion/react";
import { useAuth } from "../hooks/useAuth";

type SignInState = "SIGNED_OUT" | "CODE_SENT" | "SIGNED_IN";

export default function SignInPage() {
  const [state, setState] = useState<SignInState>("SIGNED_OUT");
  const { getCode, verifyCode } = useAuth();

  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  return (
    <>
      <Stack
        w={"100%"}
        h={"100%"}
        align={"stretch"}
        justify={"space-between"}
        gap={0}
      >
        <Title order={1} mt={"xl"}>
          Sign In
        </Title>
        <Text>Sign in with your phone number to continue.</Text>

        <Box mt={"xl"}></Box>

        <Stack align="center">
          <AnimatePresence mode="wait">
            {state === "SIGNED_OUT" && (
              <motion.div
                key={"phone-input"}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                style={{ width: "100%" }}
              >
                <PhoneInput
                  onChange={(value, isValid) => {
                    setValid(isValid);
                    setPhone(value);
                  }}
                />
              </motion.div>
            )}
            {state === "CODE_SENT" && (
              <motion.div
                key={"code-input"}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <InputWrapper label={"Code"} enterKeyHint={"send"}>
                  <PinInput
                    autoFocus
                    length={6}
                    mx={"auto"}
                    oneTimeCode
                    onChange={(value) => {
                      setCode(value);
                      setValid(value.length === 6);
                    }}
                    onComplete={(code) => {
                      setLoading(true);
                      verifyCode(phone, code).then(() => {
                        setState("SIGNED_IN");
                        setValid(false);
                        setLoading(false);
                      });
                    }}
                  />
                </InputWrapper>
              </motion.div>
            )}
          </AnimatePresence>
        </Stack>

        <Box style={{ flexGrow: 1 }}></Box>

        <Button
          disabled={!valid}
          loading={loading}
          pos={"fixed"}
          style={{
            bottom: `calc(1.5rem + var(--keyboard-padding))`,
            width: "calc(100% - 3rem)",
            left: "1.5rem",
            willChange: "bottom",
            transition: "bottom 0.15s ease-in-out",
          }}
          size="lg"
          radius="xl"
          onClick={() => {
            switch (state) {
              case "SIGNED_OUT":
                setLoading(true);
                getCode(phone).then(() => {
                  setState("CODE_SENT");
                  setValid(false);
                  setLoading(false);
                });
                break;
              case "CODE_SENT":
                setLoading(true);
                verifyCode(phone, code).then(() => {
                  setState("SIGNED_IN");
                  setValid(false);
                  setLoading(false);
                });
                break;
              case "SIGNED_IN":
              default:
                setState("CODE_SENT");
                setValid(false);
                break;
            }
          }}
        >
          {state === "SIGNED_OUT"
            ? "Send Code"
            : state === "CODE_SENT"
            ? "Verify Code"
            : "Continue"}
        </Button>
      </Stack>
    </>
  );
}
