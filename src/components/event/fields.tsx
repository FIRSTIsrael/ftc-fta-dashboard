"use client";

import { getEventInfo } from "@/lib/ftcApi";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/classNames";
import { DEFAULT_FIELDS_COUNT } from "@/constants";
import Field from "./field";

const Fields = () => {
  //TODO: Make it not a const.
  const { data: eventInfo } = useQuery({
    queryKey: ["ilcmp_1", "info"],
    queryFn: () => getEventInfo("ilcmp_1"),
  });

  return (
    <div className={cn("flex gap-8 mt-4 flex-col sm:flex-row")}>
      {Array(eventInfo?.fieldCount ?? DEFAULT_FIELDS_COUNT)
        .fill(1)
        .map((_, index) => index + 1)
        .map((field) => {
          return <Field key={field} field={field} />;
        })}
    </div>
  );
};

export default Fields;
