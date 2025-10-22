import { Group, Input, InputWrapper, Select } from "@mantine/core";
import { IMaskInput } from "react-imask";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

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
  onChange?: (value: string, isValid: boolean) => void;
}

export const PhoneInput = function PhoneInput({ onChange }: PhoneProps) {
  const [code, setCode] = useState<(typeof PhoneLocales)[number]["code"]>("");

  const locale = useMemo(() => {
    return PhoneLocales.find((local) => local.code === code) ?? PhoneLocales[0];
  }, [code]);

  return (
    <Group gap={0} w={"100%"} wrap={"nowrap"}>
      <Select
        label={"Country"}
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
      ></Select>
      <InputWrapper
        style={{
          flexGrow: 1,
        }}
        label={"Phone"}
        enterKeyHint={"next"}
      >
        <Input
          autoFocus
          unmask={true}
          autoComplete="tel"
          prefix={locale.code + " "}
          component={IMaskInput}
          mask={`${locale.code} ${locale.mask ?? "00000000"}`}
          placeholder={`${locale.code} ${locale.mask ?? "00000000"}`}
          onAccept={(value, mask) => {
            const l = (locale.mask ?? "00000000").length;

            onChange?.(locale.code + mask.unmaskedValue, value.length === l);
          }}
          radius={"0 10px 10px 0"}
        />
      </InputWrapper>
    </Group>
  );
};
