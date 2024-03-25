"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";

export const eventsContext = createContext<{
  selectedEvents?: string[];
  setSelectedEvents?: Dispatch<SetStateAction<string[]>>;
}>({});

export const EventsContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [selectedEvents, setSelectedEvents] = useState<string[]>(
    JSON.parse(localStorage.getItem("ftc-tfa-dashboard-events") || "[]")
  );
  return (
    <eventsContext.Provider value={{ selectedEvents, setSelectedEvents }}>
      {children}
    </eventsContext.Provider>
  );
};
