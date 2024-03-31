import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import Indicator from "./indicator";
import Fields from "./fields";
import { getEventInfo } from "@/lib/ftcApi";
import { eventsKeyFactory } from "@/lib/queryKeyFactory";

const Event = ({ eventCode }: { eventCode: string }) => {
  const { data: event } = useQuery({
    queryKey: eventsKeyFactory.info(eventCode),
    queryFn: () => getEventInfo(eventCode),
    retry: false,
  });

  return (
    <Card className="flex flex-col grow">
      <div className="flex flex-col gap-2 p-8 pb-4">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold">{event?.name}</div>
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
