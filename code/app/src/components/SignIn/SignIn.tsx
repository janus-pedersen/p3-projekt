import {
  Button,
  InputWrapper,
  PinInput,
  Stack,
  TextInput,
} from "@mantine/core";
import z from "zod";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const schema = z.object({
  phone: z.e164().refine((val) => val.startsWith("+45"), {
    message: "Must be a valid Danish phone number",
  }),
  code: z.string().length(6).optional(),
});

export function SignIn() {
  const form = useForm({
    mode: "controlled",
    initialValues: {
      phone: "",
      code: "",
    },
    onSubmitPreventDefault: "validation-failed",
    validateInputOnBlur: true,
    validate: zod4Resolver(schema),
  });

  const { getCode, verifyCode } = useAuth();

  const [sent, setSent] = useState(false);

  return (
    <form>
      <Stack>
        <TextInput
          withAsterisk
          label={"Phone"}
          type="tel"
          disabled={sent}
          key={form.key("phone")}
          {...form.getInputProps("phone")}
        />

        <InputWrapper label={"Code"} display={sent ? "block" : "none"}>
          <PinInput
            oneTimeCode
            length={6}
            key={form.key("code")}
            {...form.getInputProps("code")}
          />
        </InputWrapper>

        <Button
          mt={"lg"}
          onClick={async () => {
            if (!sent) {
              if (form.validateField("phone").hasError) return;
              console.log("Form values:", form.values);
              getCode(form.values.phone).then(() => {
                setSent(true);
              });
            } else {
              if (form.validateField("code").hasError) return;
              verifyCode(form.values.phone, form.values.code!)
                .then(() => {
                  // Successfully signed in
                })
                .catch((err) => {
                  form.setFieldError("code", err.message);
                });
            }
          }}
        >
          {sent ? "Verify Code" : "Send Code"}
        </Button>
      </Stack>
    </form>
  );
}
