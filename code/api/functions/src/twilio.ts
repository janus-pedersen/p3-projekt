import { defineString } from "firebase-functions/params";

const TWILIO_ACCOUNT_SID = defineString("TWILIO_ACCOUNT_SID");
const TWILIO_AUTH_TOKEN = defineString("TWILIO_AUTH_TOKEN");

import twilio from "twilio";

export const client = twilio(
  TWILIO_ACCOUNT_SID.value(),
  TWILIO_AUTH_TOKEN.value()
);
