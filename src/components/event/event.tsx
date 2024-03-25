import EventSelector from "@/app/eventSelector";
import { Card } from "../ui/card";
import Fields from "./fields";
import { useQuery } from "@tanstack/react-query";
import { getEventInfo } from "@/lib/ftcApi";

const Event = ({
  eventIndex,
  eventCode,
}: {
  eventIndex: number;
  eventCode: string;
}) => {
  const { data: event } = useQuery({
    queryKey: [eventCode, "info"],
    queryFn: () => getEventInfo(eventCode),
  });
  return (
    <Card className="flex items-center p-2 justify-center gap-3 md:gap-10 flex-col grow">
      <div className="flex flex-col gap-2 items-center md:items-start">
        <div className="text-2xl font-bold">{event?.name}</div>
        <EventSelector eventIndex={eventIndex} eventCode={eventCode} />
      </div>
      <Fields />
    </Card>
  );
};

export default Event;
