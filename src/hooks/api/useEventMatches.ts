import { REFETCH_MATCHES_INTERVAL } from "@/constants";
import { eventsKeyFactory } from "@/lib/queryKeyFactory";
import { getMatches } from "@/lib/scoringApi";
import { useQuery } from "@tanstack/react-query";
import useScoringApiInstance from "./useScoringApiInstance";

const useEventMatches = (eventCode: string) => {
  const instance = useScoringApiInstance();
  return useQuery({
    queryKey: eventsKeyFactory.matches(eventCode),
    queryFn: () => getMatches(instance, eventCode),
    retry: false,
    refetchInterval: REFETCH_MATCHES_INTERVAL,
  });
};

export default useEventMatches;
