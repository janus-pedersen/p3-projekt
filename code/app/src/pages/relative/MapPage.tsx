import { FirebaseFirestore } from "../../services/capacitor";
import { useState, useEffect } from "react";
import { Map } from "../../components/Map/Map";
import { useAuth } from "../../hooks/useAuth";
import { Box, Divider, Group, Paper, Stack } from "@mantine/core";
import { Header } from "../../components/Header/Header";
import { useRelatives } from "../../hooks/useRelatives";
import { ContactCard } from "../../components/ContactCard/ContactCard";

export function MapPage() {
  const { user } = useAuth();

  const { related } = useRelatives();

  const [snapshots, setSnaphots] = useState<
    {
      snapshots: {
        latitude: number;
        longitude: number;
        accuracy: number;
        timestamp: number;
      }[];
      uid: string;
    }[]
  >([]);

  useEffect(() => {
    if (!user?.uid) return;

    const handlers = related.map((relative) =>
      FirebaseFirestore.addCollectionSnapshotListener(
        {
          reference: `users/${relative.id}/snapshots`,
        },
        (collection) => {
          if (!collection) return;
          setSnaphots((prev) => {
            const otherSnapshots = prev.filter((s) => s.uid !== relative.id);

            return [
              ...otherSnapshots,
              {
                uid: relative.id,
                snapshots: collection.snapshots.map(
                  (doc) =>
                    ({
                      latitude: doc.data?.latitude,
                      longitude: doc.data?.longitude,
                      accuracy: doc.data?.accuracy,
                      timestamp: doc.data?.timestamp,
                    } as {
                      latitude: number;
                      longitude: number;
                      accuracy: number;
                      timestamp: number;
                    })
                ),
              },
            ];
          });
        }
      )
    );

    // const handler = FirebaseFirestore.addCollectionSnapshotListener(
    //   {
    //     reference: `users/${user.uid}/snapshots`,
    //   },
    //   (collection) => {
    //     if (!collection) return;
    //     setSnaphots(
    //       collection.snapshots.map(
    //         (doc) =>
    //           ({
    //             ...doc.data,
    //           } as (typeof snapshots)[number])
    //       )
    //     );
    //   }
    // );

    // return () => {
    //   handler.then((id) =>
    //     FirebaseFirestore.removeSnapshotListener({ callbackId: id })
    //   );
    // };

    return () => {
      handlers.forEach((handlerPromise) => {
        handlerPromise.then((id) =>
          FirebaseFirestore.removeSnapshotListener({ callbackId: id })
        );
      });
    };
  }, [related, user]);

  return (
    <>
      {/* <Header title="Map" /> */}
      <Map
        id="related-map"
        // people={[
        //   {
        //     history: snapshots.map((snapshot) => ({
        //       lat: snapshot.latitude,
        //       lng: snapshot.longitude,
        //       accuracy: snapshot.accuracy,
        //       timestamp: snapshot.timestamp,
        //     })),
        //     name: "Peter",
        //   },
        // ]}
        people={related.map((relative) => {
          const relativeSnapshots = snapshots.find(
            (s) => s.uid === relative.id
          );

          return {
            history: (relativeSnapshots?.snapshots ?? []).map((snapshot) => ({
              lat: snapshot.latitude,
              lng: snapshot.longitude,
              accuracy: snapshot.accuracy,
              timestamp: snapshot.timestamp,
            })),
            name: relative.name ?? "Unknown",
            id: relative.id,
          };
        })}
      />
      <Box
        style={{
          pointerEvents: "none",
        }}
        h={"100%"}
        w={"100%"}
        pos={"relative"}
      >
        <Paper
          radius={"lg"}
          withBorder
          // mih={"200"}
          w={"100%"}
          pos={"absolute"}
          p={"md"}
          bottom={0}
          style={{
            pointerEvents: "auto",
          }}
        >
          <Stack>
            <Header
              title="Related"
              order={2}
              margin={0}
              // action={
              //   <Select
              //     value={timerange}
              //     onChange={(value) => {
              //       if (!value) return;
              //       setTimerange(value as TimeRangeKey);
              //     }}
              //     styles={{
              //       option: { textTransform: "capitalize" },
              //       input: { textTransform: "capitalize" },
              //     }}
              //     data={TimeRangeKeys.map((key) => ({
              //       label: key.replaceAll("_", " ").toLowerCase(),
              //       value: key,
              //     }))}
              //   />
              // }
            />
            <Divider />

            {related.map((relative) => (
              <Group key={relative.id} w={"100%"} justify={"space-between"}>
                <ContactCard name={relative.name} phone={relative.phone} />

                {/* <ActionIcon size={"xl"} onClick={() => {
                  
                }}>
                  <LocateFixed />
                </ActionIcon> */}
              </Group>
            ))}
          </Stack>
        </Paper>
      </Box>
    </>
  );
}
