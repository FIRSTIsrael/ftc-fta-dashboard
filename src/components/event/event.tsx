import EventSelector from "@/app/eventSelector";
import { Card } from "../ui/card";
import Fields from "./fields";
import { useQuery } from "@tanstack/react-query";
import { getEventInfo } from "@/lib/ftcApi";
import Indicator from "./indicator";

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
    <Card className="flex flex-col grow">
      <div className="flex flex-col gap-2 p-8 pb-4">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold">{event?.name}</div>
          <Indicator eventCode={eventCode} />
        </div>
        <EventSelector eventIndex={eventIndex} eventCode={eventCode} />
      </div>
      <div className="flex grow justify-center items-center p-2 pb-8">
        <Fields eventCode={eventCode} />
      </div>
    </Card>
  );
};

export default Event;
