import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  Divider,
  Group,
  LoadingOverlay,
  Stack,
  TextInput,
} from "@mantine/core";
import type { ContextModalProps } from "@mantine/modals";
import { Header } from "../components/Header/Header";
import { PhoneInput } from "../components/PhoneInput/PhoneInput";
import { Contacts, PhoneType } from "../services/capacitor";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import z from "zod";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MoveLeft } from "lucide-react";

type GuardianInputMode = "MANUAL" | "IMPORT";

export interface GuardianModalProps {
  onComplete?: (contact: { phone: string; name?: string }) => void;
}

export function GuardianModal(mProps: ContextModalProps<GuardianModalProps>) {
  const { innerProps: props } = mProps;

  const [mode, setMode] = useState<GuardianInputMode>("IMPORT");
  const [phoneValid, setPhoneValid] = useState(false);

  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      name: "",
      phone: "",
    },
    validate: zod4Resolver(
      z.object({
        name: z.string().min(2).max(32),
        phone: z
          .e164(`Invalid phone number`)
          .refine(() => phoneValid, "Invalid phone format"),
      })
    ),
  });

  return (
    <>
      <Stack pos={"relative"}>
        <Header
          order={2}
          margin={0}
          title="Add guardian"
          subtitle="Add manually or import from contacts"
        />

        <LoadingOverlay
          visible={loading}
          overlayProps={{ radius: "sm", blur: 2 }}
        />

        <Box mt={"md"} />

        <Collapse in={mode === "IMPORT"}>
          <Button
            w={"100%"}
            mb={"md"}
            onClick={async () => {
              const { contact } = await Contacts.pickContact({
                projection: {
                  name: true,
                  phones: true,
                },
              });

              console.log(contact);

              const phone =
                contact.phones?.find((phone) => phone.type === PhoneType.Mobile)
                  ?.number || contact.phones?.[0].number;

              if (phone) {
                setLoading(true);
                await props.onComplete?.({
                  name: contact.name?.display ?? undefined,
                  phone,
                });
                setLoading(false);
              }
            }}
            flex={1}
          >
            Import Contact
          </Button>

          <Divider label={"or"} />
        </Collapse>

        <Collapse in={mode === "MANUAL"}>
          <TextInput label={t("auth.name")} {...form.getInputProps("name")} />

          <PhoneInput
            {...form.getInputProps("phone")}
            onPhoneChange={(value, valid) => {
              setPhoneValid(valid);
              form.setValues({
                phone: value,
              });
            }}
          />
        </Collapse>

        <Group w={"100%"}>
          <ButtonGroup w={"100%"}>
            {mode === "MANUAL" && (
              <Button
                variant="outline"
                onClick={() => setMode("IMPORT")}
                leftSection={<MoveLeft size={18} />}
              >
                Import
              </Button>
            )}
            <Button
              variant={mode === "IMPORT" ? "outline" : "filled"}
              onClick={async () => {
                if (mode !== "MANUAL") {
                  setMode("MANUAL");
                  return;
                }

                console.log("Phone: ", form.getValues()["phone"]);

                if (form.validate().hasErrors) return;

                setLoading(true);
                await props.onComplete?.({
                  ...form.getValues(),
                });
                setLoading(false);
              }}
              flex={1}
            >
              Add Manually
            </Button>
          </ButtonGroup>
        </Group>
      </Stack>
    </>
  );
}
