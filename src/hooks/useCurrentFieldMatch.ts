import { getMatches } from "@/lib/ftcApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useFTC from "./useFTC";
import { Match } from "@/Models/match";
import { FieldStatus } from "@/Models/fieldStatus";

const useCurrentFieldMatch = (eventCode: string, fieldNumber: number) => {
  const [currentMatch, setCurrentMatch] = useState<Match>();
  const [redReady, setRedReady] = useState<boolean>(false);
  const [blueReady, setBlueReady] = useState<boolean>(false);
  const [fieldStatus, setFieldStatus] = useState<FieldStatus>("Standby");
  const [blueReviewing, setBlueReviewing] = useState<boolean>(false);
  const [redReviewing, setRedReviewing] = useState<boolean>(false);
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
          if (
            _currentMatch.state == "TELEOP" ||
            _currentMatch.state == "AUTO"
          ) {
            setFieldStatus("In-Game");
            setMatchStartTime(_currentMatch.start);
          } else if (
            _currentMatch.state == "REVIEW" ||
            _currentMatch.state == "SUBMITTED"
          ) {
            setFieldStatus("In-Game");
            setRedReady(false);
            setBlueReady(false);
            setRedReviewing(_currentMatch.red?.teleopSubmitted ?? false);
            setBlueReviewing(_currentMatch.blue?.teleopSubmitted ?? false);
            setMatchStartTime(_currentMatch.start);
            setCurrentMatch(_currentMatch);
          } else {
            setRedReady(_currentMatch.red?.initSubmitted ?? false);
            setBlueReady(_currentMatch.blue?.initSubmitted ?? false);
            setFieldStatus("Preparing");
            setCurrentMatch(_currentMatch);
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
          if (fieldStatus !== "In-Game") {
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
      }

      if (lastMessage.type === "TELEOP_SUBMITTED") {
        const _currentMatch = matches.find(
          (match) =>
            match.matchNumber === lastMessage.number &&
            match.field === fieldNumber
        );
        if (_currentMatch) {
          if (lastMessage.alliance === "BLUE") {
            setBlueReviewing(true);
          }
          if (lastMessage.alliance === "RED") {
            setRedReviewing(true);
          }
        }
      }

      if (lastMessage.type === "MATCH_COMMIT") {
        const _currentMatch = matches.find(
          (match) =>
            match.matchNumber === lastMessage.number &&
            match.field === fieldNumber
        );
        if (_currentMatch) {
          setFieldStatus("Reset");
          setCurrentMatch(undefined);
          setMatchStartTime(undefined);
          setRedReady(false);
          setBlueReady(false);
          setBlueReviewing(false);
          setRedReviewing(false);
        }
      }
    }
  }, [lastMessage, matches, fieldNumber]);

  return {
    currentMatch,
    redReady,
    blueReady,
    fieldStatus,
    matchStartTime,
    blueReviewing,
    redReviewing,
  };
};

export default useCurrentFieldMatch;
