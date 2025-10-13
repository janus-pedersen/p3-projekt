import {
  insertRelative,
  type InsertRelativeVariables,
  type DeleteRelativeVariables,
  deleteRelative,
  getRelativesByUid,
} from "@dataconnect/generated";
import { onCall } from "firebase-functions/https";

export type RealtiveMutation =
  | {
      add: Omit<InsertRelativeVariables, "uid">[];
    }
  | {
      delete: Omit<DeleteRelativeVariables, "uid">[];
    };

export const relatives = onCall<RealtiveMutation>(async (data) => {
  if (!data.auth) throw new Error("Unauthenticated");

  if ("add" in data.data) {
    for (const relative of data.data.add) {
      await insertRelative({
        ...relative,
        uid: data.auth?.uid ?? "",
      });
    }
  }

  if ("delete" in data.data) {
    for (const relative of data.data.delete) {
      await deleteRelative({
        ...relative,
        // uid: data.auth?.uid ?? "",
      });
    }
  }

  return getRelativesByUid({ uid: data.auth.uid });
});
