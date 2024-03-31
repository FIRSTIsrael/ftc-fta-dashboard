"use client";

import { cn } from "@/lib/classNames";
import { DEFAULT_FIELDS_COUNT } from "@/constants";
import Field from "./field";
import useEventInfo from "@/hooks/api/useEventInfo";

const Fields = ({ eventCode }: { eventCode: string }) => {
  const { data: eventInfo } = useEventInfo(eventCode);

  return (
    <div className={cn("flex gap-8 mt-4 flex-wrap justify-center")}>
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
