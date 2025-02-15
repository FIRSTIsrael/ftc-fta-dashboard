import { Card } from "@/components/ui/card";
import Indicator from "./indicator";
import Fields from "./fields";
import useEventInfo from "@/hooks/api/useEventInfo";
import CycleTimeReport from "./cycle-time-report";

const Event = ({ eventCode }: { eventCode: string }) => {
  const { data: event } = useEventInfo(eventCode);

  if (!event) {
    return <></>;
  }

  return (
    <Card className="flex flex-col grow">
      <div className="flex flex-col gap-2 p-8 pb-4">
        <div className="flex justify-between items-center gap-4">
          <div className="text-xl font-bold">{event.name}</div>
          <Indicator eventCode={eventCode} />
        </div>
        <CycleTimeReport eventCode={eventCode} />
      </div>
      <div className="flex grow justify-center items-center p-2 pb-8">
        <Fields eventCode={eventCode} />
      </div>
    </Card>
  );
};

export default Event;
