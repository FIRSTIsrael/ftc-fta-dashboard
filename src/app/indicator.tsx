/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Badge } from "@/components/ui/badge";
import useFTC from "@/hooks/useFTC";
import useGlow from "@/hooks/useGlow";
import { cn } from "@/lib/classNames";
import { useEffect } from "react";

const Indicator = () => {
  const { glow, trigger } = useGlow();
  //TODO: Use all currently connected events
  const { lastMessage, status } = useFTC("ilcmp_1");
  useEffect(
    () => (status === "Connected" ? trigger() : undefined),
    [lastMessage]
  );

  return (
    <Badge
      className={cn(glow, {
        "text-green-400": status === "Connected",
        "text-yellow-500": status === "Connecting",
        "text-red-600": status === "Disconnected",
      })}
      variant="outline"
    >
      <div
        className={cn("w-2 aspect-square rounded-[50%] me-1", {
          "bg-green-400": status === "Connected",
          "bg-yellow-500": status === "Connecting",
          "bg-red-600": status === "Disconnected",
        })}
      />
      {status}
    </Badge>
  );
};

export default Indicator;
