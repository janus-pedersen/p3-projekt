import * as admin from "firebase-admin";
import { onCall } from "firebase-functions/https";

// Initialize with service account for custom token creation
if (!admin.apps.length) {
  admin.initializeApp();
}

export const getRelated = async (uid: string, phone: string) => {
  const users = await admin.firestore().collectionGroup("users").get();

  return (
    await Promise.all(
      users.docs.map(async (doc) => {
        console.log("Checking user:", doc.id);
        const rels = await doc.ref.collection("relatives").listDocuments();
        console.log(
          "Relatives:",
          rels.map((r) => r.id)
        );

        const relDoc = await doc.ref
          .collection("relatives")
          .doc(phone.replace(/\s/g, ""))
          .get();

        console.log("Checking doc:", relDoc.ref.path, "exists:", relDoc.exists);
        if (!relDoc.exists) return null;

        const authUser = await admin.auth().getUser(doc.id);
        return {
          uid: doc.id,
          ...doc.data(),
          phone: authUser.phoneNumber,
          name: authUser.displayName,
        };
      })
    )
  ).filter(Boolean);
};

export const related = onCall<{}>(async (data) => {
  const user = data.auth;
  if (!user) {
    throw new Error("Unauthenticated");
  }

  const phone = await admin
    .auth()
    .getUser(user.uid)
    .then((u) => u.phoneNumber);

  if (!phone) {
    throw new Error("User has no phone number");
  }

  return { user: user.uid, phone, related: await getRelated(user.uid, phone) };
});
