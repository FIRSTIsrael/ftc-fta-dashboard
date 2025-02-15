import { useEffect, useMemo, useState } from "react";
import useScoringWebsocket from "./useScoringWebsocket";

interface MatchCycle {
  matchNumber: number;
  scheduledStartTime: Date;
  actualStartTime?: Date;
  hasBreak: boolean;
}

const useCycleTimeReport = (eventCode: string) => {
  const [cycles, setCycles] = useState<MatchCycle[]>([]);
  const { lastMessage } = useScoringWebsocket(eventCode);

  useEffect(() => {
    if (lastMessage?.type === "INIT") {
      const cycles = lastMessage.matches.map((match: any) => ({
        matchNumber: match.number,
        scheduledStartTime: new Date(match.scheduledStart),
        actualStartTime:
          match.start === 0 || match.start === -1
            ? undefined
            : new Date(match.start),
        hasBreak: false,
      }));

      // Calculates if a cycle is after a break
      if (cycles.length > 2) {
        // Infer the scheduled cycle time from the first two matches
        const scheduledCycleTime =
          cycles[1].scheduledStartTime.getTime() -
          cycles[0].scheduledStartTime.getTime();

        for (let i = 1; i < cycles.length; i++) {
          const scheduledTimeDiff =
            cycles[i].scheduledStartTime.getTime() -
            cycles[i - 1].scheduledStartTime!.getTime();
          cycles[i].hasBreak = scheduledTimeDiff > scheduledCycleTime;
        }
      }

      setCycles(cycles);
    } else if (lastMessage?.type === "MATCH_STARTED") {
      setCycles((prev) =>
        prev.map((cycle) =>
          cycle.matchNumber === lastMessage.number
            ? { ...cycle, actualStartTime: new Date(lastMessage.startAt) }
            : cycle
        )
      );
    }
  }, [lastMessage]);

  const avgCycleTime = useMemo(() => {
    if (cycles.length === 0) return 0;
    const cycleTimes = cycles
      .filter((cycle) => cycle.actualStartTime)
      .map((cycle, i) => {
        if (i === 0 || cycle.hasBreak) return null;
        const prevCycle = cycles[i - 1];
        return (
          cycle.actualStartTime!.getTime() -
          prevCycle.actualStartTime!.getTime()
        );
      })
      .filter((time) => time) as number[];
    return cycleTimes.reduce((a, b) => a + b, 0) / cycleTimes.length;
  }, [cycles]);

  const scheduleDifference = useMemo(() => {
    const lastStartedCycle = cycles.findLast((cycle) => cycle.actualStartTime);
    if (!lastStartedCycle) return 0;
    return (
      lastStartedCycle.scheduledStartTime.getTime() -
      lastStartedCycle.actualStartTime!.getTime()
    );
  }, [cycles]);

  return { avgCycleTime, scheduleDifference };
};

export default useCycleTimeReport;
