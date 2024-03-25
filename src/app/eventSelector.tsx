"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getEvents } from "@/lib/ftcApi";
import { eventsContext } from "@/providers/eventsContextProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const EventSelector = ({
  eventIndex,
  eventCode,
}: {
  eventIndex: number;
  eventCode: string;
}) => {
  const { selectedEvents, setSelectedEvents } = useContext(eventsContext);
  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    select: (data) => data.filter((event) => !selectedEvents?.includes(event)),
  });

  return (
    <Select
      value={eventCode}
      onValueChange={(eventCode) => {
        setSelectedEvents?.((prevSelectedEvents) => {
          const newSelectedEvents = prevSelectedEvents.map((e, i) =>
            i === eventIndex ? eventCode : e
          );
          localStorage.setItem(
            "ftc-tfa-dashboard-events",
            JSON.stringify(newSelectedEvents)
          );
          return newSelectedEvents;
        });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Event" />
      </SelectTrigger>
      <SelectContent>
        {data?.map((eventCode) => {
          return (
            <SelectItem value={eventCode} key={eventCode}>
              {eventCode}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
export default EventSelector;
