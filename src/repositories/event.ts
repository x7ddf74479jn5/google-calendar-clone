import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";

import { auth, db, getConverter } from "@/lib/firebase";
import type { Event } from "@/models/event";
import { eventSchema } from "@/models/event";

const eventConverter = getConverter<Event>(eventSchema.parse);

const getEventDocRef = (userId: string, eventId: string) => {
  return doc(db, userId, "events", eventId).withConverter(eventConverter);
};

const getEventColRef = (userId: string) => {
  return collection(db, userId, "events").withConverter(eventConverter);
};

export const writeEventData = async (event: Event) => {
  try {
    const userId = auth?.currentUser?.uid;
    if (!userId) throw new Error("No user logged in");
    const eventDocRef = getEventDocRef(userId, event.id);
    await setDoc(eventDocRef, event);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
};

export const deleteEvent = async (event: Event) => {
  try {
    const userId = auth?.currentUser?.uid;
    if (!userId) throw new Error("No user logged in");
    const eventDocRef = getEventDocRef(userId, event.id);
    await deleteDoc(eventDocRef);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
};

export const getEventsData = async () => {
  try {
    const userId = auth?.currentUser?.uid;
    if (!userId) throw new Error("No user logged in");
    const eventColRef = getEventColRef(userId);
    const snapshot = await getDocs(eventColRef);
    if (!snapshot.empty) {
      const events = snapshot.docs.map((doc) => doc.data());
      // const parsedEvents = (Object.keys(events) as (keyof Event)[]).map((key) => events[key]);
      // const parsed = events.map((event) => event[keyof event]);
      // console.log(parsedEvents);
      return events;
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
    return [];
  }
};
