import { Group, Input, InputWrapper, Select } from "@mantine/core";
import { IMaskInput } from "react-imask";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface PhoneLocale {
  flag: string;
  code: string;
  label: string;
  mask?: string;
}

const PhoneLocales: PhoneLocale[] = [
  {
    flag: "🇩🇰",
    code: "+45",
    label: "Denmark",
  },
  {
    flag: "🇸🇪",
    code: "+46",
    label: "Sweden",
  },
  {
    flag: "🇺🇸",
    code: "+1",
    label: "United States",
    mask: "(000) 000-0000000",
  },
];

export interface PhoneProps {
  value?: string;
  defaultValue?: string;

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  error?: string;

  onPhoneChange?: (value: string, isValid: boolean) => void;

  autoFocus?: boolean;
}

export const PhoneInput = function PhoneInput({ ...props }: PhoneProps) {
  const { t } = useTranslation();
  const [code, setCode] = useState<(typeof PhoneLocales)[number]["code"]>("");

  const locale = useMemo(() => {
    return PhoneLocales.find((local) => local.code === code) ?? PhoneLocales[0];
  }, [code]);

  return (
    <InputWrapper error={props.error}>
      <Group gap={0} w={"100%"} wrap={"nowrap"} pb={"4"}>
        <Select
          label={t("auth.country")}
          comboboxProps={{
            width: "max-content",
          }}
          value={locale.code}
          rightSection={<ChevronDown size={14} />}
          //   variant={"filled"}
          data={PhoneLocales.map((local) => ({
            label: `${local.flag}`,
            value: local.code,
            disabled: local.code === locale.code,
          }))}
          onChange={(val) => {
            if (val) setCode(val);
          }}
          radius={"10px 0 0 10px"}
          w={75}
          error={!!props.error}
        ></Select>
        <InputWrapper
          style={{
            flexGrow: 1,
          }}
          label={t("auth.phone")}
          enterKeyHint={"next"}
        >
          <Input
            value={props.value?.slice(locale.code.length)}
            defaultValue={props.defaultValue}
            autoFocus={props.autoFocus}
            unmask={true}
            autoComplete="tel"
            inputMode={"tel"}
            prefix={locale.code + " "}
            component={IMaskInput}
            mask={`${locale.code} ${locale.mask ?? "00000000"}`}
            placeholder={`${locale.code} ${locale.mask ?? "00000000"}`}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            onAccept={(value, mask) => {
              const l = (locale.mask ?? "00000000").length;

              props.onPhoneChange?.(
                locale.code + mask.unmaskedValue,
                value.length === l
              );
            }}
            radius={"0 10px 10px 0"}
            // {...(props.inputProps as InputProps)}
            error={!!props.error}
          />
        </InputWrapper>
      </Group>
    </InputWrapper>
  );
};
