"use client";

import { SelectProps } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useServerEvents from "@/hooks/api/useServerEvents";

const EventSelector = (props: SelectProps) => {
  const { data: events } = useServerEvents();
  //TODO: Event can be selected twice. This should not happen.
  return (
    <Select {...props}>
      <SelectTrigger className="w-[180px] grow">
        <SelectValue placeholder="Select an event" />
      </SelectTrigger>
      <SelectContent>
        {(events ?? []).map((eventCode) => {
          return (
            <SelectItem key={eventCode} value={eventCode}>
              {eventCode}
            </SelectItem>
          );
        })}
        {!!events && events.length === 0 && (
          <SelectItem value="empty" disabled>
            No event found
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};
export default EventSelector;
