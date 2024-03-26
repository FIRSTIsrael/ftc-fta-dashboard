"use client";

import { useEffect, useState } from "react";
import useCurrentFieldMatch from "@/hooks/useCurrentFieldMatch";
import useFieldTimer from "@/hooks/useFieldTimer";
import { cn } from "@/lib/classNames";
import { MatchAlliance } from "@/Models/matchAlliance";
import { Card } from "@/components/ui/card";
import SevenSegment from "@/components/ui/sevenSegment";

const Team = ({ number }: { number?: number }) => (
  <SevenSegment
    enabled={!!number}
    value={number ? String(number) : ""}
    minimumLength={5}
  />
);

const Alliance = ({
  alliance,
  color,
}: {
  alliance?: MatchAlliance;
  color: "red" | "blue";
}) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-around text-2xl p-3 border-2 rounded-xl",
        color === "red" ? "border-red-500" : "border-blue-500"
      )}
    >
      <Team number={alliance?.team1} />
      <Team number={alliance?.team2} />
    </div>
  );
};

const MatchTimer = ({
  fieldTimer: {
    fieldTimer: { minutes, seconds },
    synced,
  },
}: {
  fieldTimer: ReturnType<typeof useFieldTimer>;
}) => (
  <div className="flex w-fit text-4xl">
    <SevenSegment
      enabled={synced}
      value={String(minutes ?? 0).padStart(2, "0")}
      minimumLength={2}
    />
    <SevenSegment enabled value=":" fixedSize={false} />
    <SevenSegment
      enabled={synced}
      value={String(seconds ?? 0).padStart(2, "0")}
      minimumLength={2}
    />
  </div>
);

const useCounter = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);
  console.log("count", count);
};

const Field = ({ field, eventCode }: { field: number; eventCode: string }) => {
  const { currentMatch, matchStartTime, fieldStatus, redStatus, blueStatus } =
    useCurrentFieldMatch(eventCode, field);
  const fieldTimer = useFieldTimer(matchStartTime ?? 0);

  return (
    <div className="flex gap-2">
      <Alliance alliance={currentMatch?.blue!} color="blue" />
      <Card
        className={cn(
          "aspect-square w-48 bg-gradient-to-r from-transparent via-transparent p-1 rounded-2xl",
          {
            "animate-fast-red-flash": fieldStatus === "Aborted",
            "animate-slow-green-flash":
              fieldStatus === "In-Game" && fieldTimer.gameState !== "Review",
            "to-red-500":
              (redStatus.initSubmitted &&
                fieldTimer.gameState === "Preparing") ||
              (redStatus.reviewSubmitted &&
                fieldTimer.gameState === "Review" &&
                fieldStatus !== "Submitted"),
            "from-blue-500":
              (blueStatus.initSubmitted &&
                fieldTimer.gameState === "Preparing") ||
              (blueStatus.reviewSubmitted &&
                fieldTimer.gameState === "Review" &&
                fieldStatus !== "Submitted"),
            "animate-slow-amber-flash": fieldStatus === "Submitted",
          },
          fieldTimer.gameState === "Review" &&
            (!redStatus.teleopSubmitted && !blueStatus.teleopSubmitted
              ? "animate-fast-flash-alliances"
              : !redStatus.teleopSubmitted
              ? "animate-fast-flash-red-alliance"
              : !blueStatus.teleopSubmitted
              ? "animate-fast-flash-blue-alliance"
              : "")
        )}
      >
        <Card className="h-full w-full flex flex-col gap-3 justify-center items-center rounded-xl">
          <div className="text-zinc-600 dark:text-zinc-400">
            Field {field}
            {currentMatch?.matchNumber ? ` - ${currentMatch.matchName}` : ""}
          </div>
          <div className="text-2xl font-semibold bg-muted px-2 py-0.5 rounded-lg">
            {fieldTimer.gameState === "Preparing" ||
            (fieldTimer.gameState === "Review" && fieldStatus !== "In-Game")
              ? fieldStatus
              : fieldTimer.gameState}
          </div>
          <MatchTimer fieldTimer={fieldTimer} />
        </Card>
      </Card>
      <Alliance alliance={currentMatch?.red} color="red" />
    </div>
  );
};

export default Field;
