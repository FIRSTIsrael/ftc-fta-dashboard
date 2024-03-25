"use client";

import Event from "@/components/event/event";
import Header from "./header";
import Fabs from "@/components/settings/fabs";
import { useContext } from "react";
import { eventsContext } from "@/providers/eventsContextProvider";

export default function Home() {
  const { selectedEvents } = useContext(eventsContext);
  return (
    <>
      <div className="flex flex-col gap-4 p-4 h-[100vh]">
        <Header />
        <div className="grow flex w-full gap-4 flex-col md:flex-row">
          {selectedEvents?.map((eventCode, eventIndex) => (
            <Event
              key={eventCode}
              eventIndex={eventIndex}
              eventCode={eventCode}
            />
          ))}
        </div>
      </div>
      <Fabs />
    </>
  );
}
