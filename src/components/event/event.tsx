import EventSelector from "@/app/eventSelector";
import { Card } from "../ui/card";
import Fields from "./fields";

const Event = () => (
  <Card className="flex items-center px-2 py-8 justify-center gap-3 md:gap-10 flex-col grow">
    <div className="flex flex-col gap-2 items-center md:items-start">
      {/* TODO: Use the event name and event selector */}
      <div className="text-2xl font-bold">Event Name</div>
      <EventSelector />
    </div>
    <Fields />
  </Card>
);

export default Event;
