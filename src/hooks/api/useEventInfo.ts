import { eventsKeyFactory } from "@/lib/queryKeyFactory";
import { useQuery } from "@tanstack/react-query";
import useScoringApiInstance from "./useScoringApiInstance";
import { getEventInfo } from "@/lib/scoringApi";
import { useStorage } from "@/providers/storageProvider";

const useEventInfo = (eventCode: string) => {
  const instance = useScoringApiInstance();
  const { setData } = useStorage();
  return useQuery({
    queryKey: eventsKeyFactory.info(eventCode),
    queryFn: async () => {
      // Remove the event if the response from the server fails.
      const eventInfo = await getEventInfo(instance, eventCode);
      if (eventInfo === null) {
        setData("events", (events) =>
          (events ?? []).filter((event) => event !== eventCode)
        );
      }
      return eventInfo;
    },
    retry: false,
  });
};

export default useEventInfo;
