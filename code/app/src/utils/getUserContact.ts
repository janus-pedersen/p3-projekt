import { Contacts } from "../services/capacitor";
import parsePhoneNumber from "libphonenumber-js";

export const getContactByPhone = (target: string) => {
  return Contacts.getContacts({
    projection: {
      image: true,
      phones: true,
      name: true,
    },
  }).then((result) => {
    const targetContact = result.contacts.find((c) => {
      if (
        c.phones?.some((phone) => {
          if (!phone || !phone.number) return false;
          const parsed = parsePhoneNumber(phone.number);
          if (parsed?.number === target) return true;
        })
      )
        return c;
    });

    return targetContact;
  });
};
