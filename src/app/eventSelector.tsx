"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getEvents } from "@/lib/ftcApi";
import { useQuery } from "@tanstack/react-query";

const EventSelector = () => {
  const { data } = useQuery({ queryKey: ["evens"], queryFn: getEvents });

  return (
    <Select>
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
