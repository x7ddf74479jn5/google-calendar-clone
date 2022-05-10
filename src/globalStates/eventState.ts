import { useEffect, useReducer } from "react";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { useModalState } from "@/globalStates/modalState";
import type { Event } from "@/models";

type SelectedEventState = Event | null;

const selectedEventState = atom<SelectedEventState>({
  key: "selectedEvent",
  default: null,
});

export const useSelectedEvent = () => {
  const [selectedEvent, setSelectedEvent] = useRecoilState(selectedEventState);
  const isShowEventModal = useModalState();

  useEffect(() => {
    if (!isShowEventModal) {
      setSelectedEvent(null);
    }
  }, [isShowEventModal]);

  return selectedEvent;
};

type IsLoadingEventsState = boolean;

const isLoadingEventsState = atom<IsLoadingEventsState>({
  key: "isLoadingEvents",
  default: true,
});

export const useIsLoadingEventsState = () => {
  return useRecoilValue(isLoadingEventsState);
};

type SavedEvents = Event[];

const savedEventsState = atom<SavedEvents>({
  key: "savedEvents",
  default: [],
});

type EventActionType = "fetch" | "push" | "update" | "delete";

type EventAction = { type: EventActionType; payload: Event };

export const useSavedEvents = () => {
  const [savedEvents, setSavedEvents] = useRecoilState(savedEventsState);
  const setLoadingEvents = useSetRecoilState(isLoadingEventsState);

  const savedEventsReducer = (state: SavedEvents, { type, payload }: EventAction) => {
    switch (type) {
      case "fetch":
        setLoadingEvents(false);
        return [payload];
      case "push":
        return [...state, payload];
      case "update":
        return state.map((event) => (event.id === payload.id ? payload : event));
      case "delete":
        return state.filter((event) => event.id !== payload.id);
      default:
        throw new Error();
    }
  };

  const [] = useReducer(savedEventsReducer, []);
};
