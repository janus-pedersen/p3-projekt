import { describe, expect, it, vi } from "vitest";
import { getContactByPhone } from "./getUserContact";
import { Contacts } from "../services/capacitor";

describe("getContactByPhone", () => {
  // Ensures we return the right contact given an E.164 phone number.
  it("returns the matching contact by E.164 phone number", async () => {
    vi.mocked(Contacts.getContacts).mockResolvedValueOnce({
      contacts: [
        {
          name: { display: "Alice" },
          phones: [{ number: "+4511111111" }],
        },
        {
          name: { display: "Bob" },
          phones: [{ number: "+4512345678" }],
        },
      ],
    } as never);

    const contact = await getContactByPhone("+4512345678");
    expect(contact?.name?.display).toBe("Bob");

    // Verifies the projection we request from the Contacts plugin.
    expect(Contacts.getContacts).toHaveBeenCalledWith({
      projection: { image: true, phones: true, name: true },
    });
  });

  // When nothing matches, the helper should resolve to undefined.
  it("returns undefined when no contact matches", async () => {
    vi.mocked(Contacts.getContacts).mockResolvedValueOnce({
      contacts: [{ name: { display: "Alice" }, phones: [{ number: "+4511111111" }] }],
    } as never);

    const contact = await getContactByPhone("+4512345678");
    expect(contact).toBeUndefined();
  });
});
