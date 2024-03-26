"use client";

import { useState } from "react";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventSelector from "./eventSelector";
import { useEvents } from "@/providers/eventsContextProvider";
import { Label } from "../ui/label";

const EventList = () => {
  const { selectedEvents, setSelectedEvents } = useEvents();
  const [isAddingEvent, setIsAddingEvent] = useState<boolean>(
    () => selectedEvents.length === 0
  );

  return (
    <>
      <div className="space-y-2">
        {selectedEvents.map((eventCode, eventIndex) => (
          <div key={eventCode + eventIndex} className="flex gap-2">
            <div className="grid grid-cols-4 items-center gap-4 grow">
              <Label>Event {eventIndex + 1}</Label>
              <div className="flex col-span-3 gap-1">
                <EventSelector
                  value={eventCode}
                  onValueChange={(value) => {
                    setSelectedEvents((prev) => {
                      const newEvents = [...(prev ?? [])];
                      newEvents[eventIndex] = value;
                      return newEvents;
                    });
                  }}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() =>
                    setSelectedEvents((prev) => {
                      if (prev) {
                        return prev.filter((_, i) => i !== eventIndex);
                      }
                      return [];
                    })
                  }
                  disabled={selectedEvents.length === 1 && !isAddingEvent}
                >
                  <TrashIcon className="h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {isAddingEvent && (
          <div className="grid grid-cols-4 items-center gap-4 grow">
            <Label>Event {selectedEvents.length + 1}</Label>
            <div className="flex col-span-3">
              <EventSelector
                onValueChange={(value) => {
                  setSelectedEvents((prev) => [...(prev ?? []), value]);
                  setIsAddingEvent(false);
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsAddingEvent(true)}
        >
          Add Event
        </Button>
      </div>
    </>
  );
};

export default EventList;
