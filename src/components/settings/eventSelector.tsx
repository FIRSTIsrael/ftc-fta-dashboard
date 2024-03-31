"use client";

import { SelectProps } from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getEvents } from "@/lib/ftcApi";
import { eventsKeyFactory } from "@/lib/queryKeyFactory";

const EventSelector = (props: SelectProps) => {
  const { data: events } = useQuery({
    queryKey: eventsKeyFactory.all,
    queryFn: getEvents,
    initialData: [],
    retry: false,
  });

  return (
    <Select {...props}>
      <SelectTrigger className="w-[180px] grow">
        <SelectValue placeholder="Select an event" />
      </SelectTrigger>
      <SelectContent>
        {events.map((eventCode) => {
          return (
            <SelectItem key={eventCode} value={eventCode}>
              {eventCode}
            </SelectItem>
          );
        })}
        {events.length === 0 && (
          <SelectItem value="empty" disabled>
            No event found
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};
export default EventSelector;
