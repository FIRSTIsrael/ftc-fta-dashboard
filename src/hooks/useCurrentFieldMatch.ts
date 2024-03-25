import { getMatches } from "@/lib/ftcApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useFTC from "./useFTC";
import { Match } from "@/Models/match";

const useCurrentFieldMatch = (eventCode: string, fieldNumber: number) => {
  const [currentMatch, setCurrentMatch] = useState<Match>();
  const [redReady, setRedReady] = useState<boolean>(false);
  const [blueReady, setBlueReady] = useState<boolean>(false);
  // TODO: Convert status to type
  const [fieldStatus, setFieldStatus] = useState<string>("Standby");
  const [matchStartTime, setMatchStartTime] = useState<number>();
  const { lastMessage } = useFTC(eventCode);
  const { data: matches } = useQuery({
    queryKey: [eventCode, "matches"],
    queryFn: () => getMatches(eventCode),
  });

  useEffect(() => {
    if (lastMessage && lastMessage.type !== "PONG") {
      //TODO: Remove
      console.log(lastMessage);
    }

    if (lastMessage && matches) {
      if (lastMessage.type === "INIT") {
        //TODO: Fix typing
        const _currentMatch = (lastMessage.matches as any[])
          .toSorted((a, b) => b.number - a.number)
          .find(
            (match: any) =>
              match.isActive === true && match.field === fieldNumber
          );
        if (_currentMatch) {
          setRedReady(_currentMatch.red?.initSubmitted ?? false);
          setBlueReady(_currentMatch.blue?.initSubmitted ?? false);
          setFieldStatus("Preparing");
          setCurrentMatch(_currentMatch);
          if (
            _currentMatch.state == "TELEOP" ||
            _currentMatch.state == "AUTO"
          ) {
            setFieldStatus("In-Game");
            setMatchStartTime(_currentMatch.start);
          }
        }
      }
      if (lastMessage.type === "MATCH_LOAD") {
        const _currentMatch = matches.find(
          (match) =>
            match.matchNumber === lastMessage.number &&
            match.field === fieldNumber
        );
        if (_currentMatch) {
          setFieldStatus("Preparing");
          setRedReady(false);
          setBlueReady(false);
          setCurrentMatch(_currentMatch);
        }
      }
      if (lastMessage.type === "MATCH_STARTED") {
        const _currentMatch = matches.find(
          (match) =>
            match.matchNumber === lastMessage.number &&
            match.field === fieldNumber
        );
        if (_currentMatch) {
          setFieldStatus("In-Game");
          setCurrentMatch(_currentMatch);
          setMatchStartTime(Number(lastMessage.startAt));
        }
      }
      if (lastMessage.type === "MATCH_ABORT") {
        const _currentMatch = matches.find(
          (match) =>
            match.matchNumber === lastMessage.number &&
            match.field === fieldNumber
        );
        if (_currentMatch) {
          setFieldStatus("Aborted");
          setCurrentMatch(_currentMatch);
          setRedReady(false);
          setBlueReady(false);
          setMatchStartTime(0);
        }
      }
      if (lastMessage.type === "MATCH_INIT") {
        const _currentMatch = matches.find(
          (match) =>
            match.matchNumber === lastMessage.number &&
            match.field === fieldNumber
        );
        if (_currentMatch) {
          setRedReady(lastMessage.redInitSubmitted);
          setBlueReady(lastMessage.blueInitSubmitted);
          if (lastMessage.redInitSubmitted && lastMessage.blueInitSubmitted) {
            setFieldStatus("Ready");
          } else {
            setFieldStatus("Preparing");
          }
          setCurrentMatch(_currentMatch);
        }
      }
      //TODO: Add TELEOP_SUBMITTED state
      if (lastMessage.type === "MATCH_COMMIT") {
        setFieldStatus("Reset");
      }
    }
  }, [lastMessage, matches, fieldNumber]);

  return { currentMatch, redReady, blueReady, fieldStatus, matchStartTime };
};

export default useCurrentFieldMatch;
