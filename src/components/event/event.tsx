import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import Indicator from "./indicator";
import Fields from "./fields";
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
    <Card className="flex flex-col grow">
      <div className="flex flex-col gap-2 p-8 pb-4">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold">{event?.name}</div>
          <Indicator eventCode={eventCode} />
        </div>
      </div>
      <div className="flex grow justify-center items-center p-2 pb-8">
        <Fields eventCode={eventCode} />
      </div>
    </Card>
  );
};

export default Event;
