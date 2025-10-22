import { onCall } from "firebase-functions/https";
import * as admin from "firebase-admin";
import { defineString } from "firebase-functions/params";
import { client } from "./twilio";
import { logger } from "firebase-functions";

// Initialize with service account for custom token creation
if (!admin.apps.length) {
  admin.initializeApp();
}

const TWILIO_SERVICE_ID = defineString("TWILIO_SERVICE_ID");

export const update = onCall<Partial<admin.auth.UpdateRequest>>(
  async (data, context) => {
    if (!data.auth) {
      throw new Error("Unauthenticated");
    }

    const updates = data.data;
    return await admin.auth().updateUser(data.auth.uid, updates);
  }
);

export const verify = onCall<{ phone: string; code: string }>(
  async (data, context) => {
    const { phone, code } = data.data;

    if (!phone || typeof phone !== "string")
      return {
        error: "Invalid phone number",
      };

    if (code) {
      const check = await client.verify.v2
        .services(TWILIO_SERVICE_ID.value())
        .verificationChecks.create({
          to: phone,
          code,
        });

      if (check.status !== "approved")
        return {
          error: "Invalid code",
        };

      let user;
      try {
        user = await admin.auth().getUserByPhoneNumber(phone);
        logger.info("Signing in: ", user.uid);
      } catch (error) {
        user = await admin.auth().createUser({
          phoneNumber: phone,
        });
        logger.info("Created new user:", user.uid);
      }

      let token;
      try {
        token = await admin.auth().createCustomToken(user.uid);
      } catch (error) {
        logger.error("Failed to create custom token:", error);
        return {
          error: "Failed to create token",
        };
      }

      return {
        token,
      };
    }

    client.verify.v2.services(TWILIO_SERVICE_ID.value()).verifications.create({
      to: phone,
      channel: "sms",
    });

    return {
      message: "Code sent",
    };
  }
);
