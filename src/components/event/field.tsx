"use client";

import useCurrentFieldMatch from "@/hooks/useCurrentFieldMatch";
import useFieldTimer from "@/hooks/useFieldTimer";
import { cn } from "@/lib/classNames";
import { MatchAlliance } from "@/Models/matchAlliance";
import { Card } from "@/components/ui/card";
import SevenSegment from "@/components/ui/sevenSegment";

const Team = ({ number }: { number?: number }) => (
  <SevenSegment enabled={!!number} value={String(number)} minimumLength={5} />
);

const Alliance = ({ alliance }: { alliance?: MatchAlliance }) => {
  return (
    <div className="flex flex-col justify-center gap-12">
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
  <div className="flex w-fit">
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

const Field = ({ field, eventCode }: { field: number; eventCode: string }) => {
  const {
    currentMatch,
    blueReady,
    redReady,
    fieldStatus,
    matchStartTime,
    redReviewing,
    blueReviewing,
  } = useCurrentFieldMatch(eventCode, field);
  const fieldTimer = useFieldTimer(matchStartTime ?? 0);

  return (
    <div className="flex gap-2">
      <Alliance alliance={currentMatch?.blue!} />
      <Card
        className={cn(
          "aspect-square w-40 bg-gradient-to-r from-transparent via-transparent p-1 rounded-xl",
          {
            "animate-fast-red-flash": fieldStatus === "Aborted",
            "animate-slow-green-flash":
              fieldStatus === "In-Game" && fieldTimer.gameState !== "Review",
            "to-red-500": redReady && fieldStatus !== "In-Game",
            "from-blue-500": blueReady && fieldStatus !== "In-Game",
            "animate-fast-flash-red-alliance":
              !redReviewing && fieldTimer.gameState === "Review",
            "animate-fast-flash-blue-alliance":
              !blueReviewing && fieldTimer.gameState === "Review",
          }
        )}
      >
        <Card className="h-full w-full flex flex-col gap-1 justify-center items-center">
          <div>Field {field}</div>
          <div>
            {fieldTimer.gameState === "Preparing"
              ? fieldStatus
              : fieldTimer.gameState}
          </div>
          <MatchTimer fieldTimer={fieldTimer} />
        </Card>
      </Card>
      <Alliance alliance={currentMatch?.red} />
    </div>
  );
};

export default Field;
