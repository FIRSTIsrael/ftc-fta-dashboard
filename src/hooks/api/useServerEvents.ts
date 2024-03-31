import { getEvents } from "@/lib/scoringApi";
import { eventsKeyFactory } from "@/lib/queryKeyFactory";
import { useQuery } from "@tanstack/react-query";
import useScoringApiInstance from "./useScoringApiInstance";

const useServerEvents = () => {
  const instance = useScoringApiInstance();
  return useQuery({
    queryKey: eventsKeyFactory.all,
    queryFn: () => getEvents(instance),
  });
};

export default useServerEvents;
