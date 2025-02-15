"use client";

import useCycleTimeReport from "@/hooks/api/useCycleTimeReport";
import { durationFormat } from "@/lib/format";

const CycleTimeReport = ({ eventCode }: { eventCode: string }) => {
  const { avgCycleTime, scheduleDifference } = useCycleTimeReport(eventCode);

  return (
    <div>
      <p>
        <span className="text-muted-foreground">Avg Cycle Time:</span>{" "}
        <span className="font-medium">
          {durationFormat(avgCycleTime, { long: true })}
        </span>
      </p>
      <p>
        <span className="text-muted-foreground">Schedule:</span>{" "}
        <span className="font-medium">
          {durationFormat(Math.abs(scheduleDifference))}{" "}
          {Math.abs(scheduleDifference) < 60 * 1000
            ? "(On Time)"
            : scheduleDifference > 0
            ? "Early"
            : "Late"}
        </span>
      </p>
    </div>
  );
};

export default CycleTimeReport;
