import { getEventInfo } from "@/lib/ftcApi";
import { useStorage } from "@/providers/storageProvider";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const useFTC = (eventCode: string) => {
  const { endpoint } = useStorage();
  const { status: queryStatus } = useQuery({
    queryKey: [eventCode, "info"],
    queryFn: () => getEventInfo(eventCode),
    retry: false,
  });
  const { lastMessage: _lastMessage, readyState } = useWebSocket(
    `ws://${endpoint}/stream/control/?code=${eventCode}`,
    {
      share: true,
    }
  );

  const lastMessage = useMemo(() => {
    if (!_lastMessage) return undefined;
    return _lastMessage.data === "pong"
      ? { type: "PONG" }
      : JSON.parse(_lastMessage.data);
  }, [_lastMessage]);

  const status = useMemo<"Connected" | "Disconnected" | "Connecting">(() => {
    if (readyState === ReadyState.OPEN && queryStatus === "success") {
      return "Connected";
    }
    if (
      readyState === ReadyState.CLOSED ||
      readyState === ReadyState.CLOSING ||
      readyState === ReadyState.UNINSTANTIATED ||
      queryStatus === "error"
    ) {
      return "Disconnected";
    }
    if (readyState === ReadyState.CONNECTING || queryStatus === "pending") {
      return "Connecting";
    }
    return "Disconnected";
  }, [queryStatus, readyState]);

  return {
    lastMessage,
    status,
  };
};

export default useFTC;
