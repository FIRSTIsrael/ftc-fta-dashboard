"use client";

import SevenSegment from "@/components/ui/sevenSegment";
import useCurrentTime from "@/hooks/useCurrentTime";
import { cn } from "@/lib/classNames";

const Time = ({ className = "text-3xl" }: { className?: string }) => {
  const time = useCurrentTime();

  //TODO, Decide if I want to use it.
  const blinkClass = {
    // "text-muted": time.decisecond >= 3 && time.decisecond <= 8,
  };

  return (
    <div className="flex">
      <SevenSegment
        value={String(time.hours).padStart(2, "0")}
        enabled={time.synced}
        className={className}
      />
      <SevenSegment
        value=":"
        enabled
        className={cn(className, blinkClass)}
        fixedSize={false}
      />
      <SevenSegment
        value={String(time.minutes).padStart(2, "0")}
        enabled={time.synced}
        className={className}
      />
      <SevenSegment
        value=":"
        enabled
        className={cn(className, blinkClass)}
        fixedSize={false}
      />
      <SevenSegment
        value={String(time.seconds).padStart(2, "0")}
        enabled={time.synced}
        className={className}
      />
    </div>
  );
};

export default Time;
