"use client";

import { getEventInfo } from "@/lib/ftcApi";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/classNames";
import { DEFAULT_FIELDS_COUNT } from "@/constants";
import Field from "./field";

const Fields = ({ eventCode }: { eventCode: string }) => {
  const { data: eventInfo } = useQuery({
    queryKey: [eventCode, "info"],
    queryFn: () => getEventInfo(eventCode),
  });

  return (
    <div className={cn("flex gap-8 mt-4 flex-col sm:flex-row")}>
      {Array(eventInfo?.fieldCount ?? DEFAULT_FIELDS_COUNT)
        .fill(1)
        .map((_, index) => index + 1)
        .map((field) => {
          return <Field key={field} field={field} eventCode={eventCode} />;
        })}
    </div>
  );
};

export default Fields;
