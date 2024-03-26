"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LOCAL_STORAGE_KEY = "ftc-fta-dashboard-events";

const EventsContext = createContext<{
  selectedEvents: string[];
  setSelectedEvents: Dispatch<SetStateAction<string[]>>;
}>({
  selectedEvents: [],
  setSelectedEvents: () => {},
});

export const useEvents = () => useContext(EventsContext);

export const EventsContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [selectedEvents, setSelectedEvents] = useState<string[] | null>(null);

  useEffect(() => {
    setSelectedEvents(
      JSON.parse(localStorage?.getItem(LOCAL_STORAGE_KEY) || "[]")
    );
  }, []);

  useEffect(() => {
    // Save selected events to local storage on change
    if (selectedEvents) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedEvents));
    }
  }, [selectedEvents]);

  return (
    <EventsContext.Provider
      value={{ selectedEvents: selectedEvents || [], setSelectedEvents }}
    >
      {children}
    </EventsContext.Provider>
  );
};
