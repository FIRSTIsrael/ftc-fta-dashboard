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

const EventSelector = (props: SelectProps) => {
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    initialData: ["ilcmp_1", "ilcmp_2"],
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
