"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export const eventsContext = createContext<{
  selectedEvents?: string[];
  setSelectedEvents?: Dispatch<SetStateAction<string[]>>;
}>({});

export const EventsContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  useEffect(() => {
    setSelectedEvents(
      JSON.parse(localStorage?.getItem("ftc-tfa-dashboard-events") || "[]")
    );
  }, []);

  return (
    <eventsContext.Provider value={{ selectedEvents, setSelectedEvents }}>
      {children}
    </eventsContext.Provider>
  );
};
