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
  const [blueReviewSubmitted, setBlueReviewSubmitted] =
    useState<boolean>(false);
  const [redReviewSubmitted, setRedReviewSubmitted] = useState<boolean>(false);
  const [matchStartTime, setMatchStartTime] = useState<number>();
  const { lastMessage } = useFTC(eventCode);
  const { data: matches, refetch } = useQuery({
    queryKey: [eventCode, "matches"],
    queryFn: () => getMatches(eventCode),
    initialData: [],
  });

  useEffect(() => {
    if (lastMessage && lastMessage.type !== "PONG") {
      //TODO: Remove
      console.log(lastMessage);
    }
    if (matches.length === 0) {
      refetch();
    }

    if (lastMessage) {
      if (lastMessage.type === "INIT") {
        //TODO: Fix typing
        const _currentMatch = (lastMessage.matches as any[])
          .toSorted((a, b) => b.number - a.number)
          .find(
            (match: any) =>
              match.isActive === true && match.field === fieldNumber
          );
        if (_currentMatch) {
          const matchBrief = {
            matchName: _currentMatch.shortName,
            matchNumber: _currentMatch.number,
            field: _currentMatch.field,
            red: {
              team1: _currentMatch.red.team1,
              team2: _currentMatch.red.team2,
              team3: _currentMatch.red.team3,
              isTeam1Surrogate: _currentMatch.red.team1Surrogate,
              isTeam2Surrogate: _currentMatch.red.team2Surrogate,
              isTeam3Surrogate: _currentMatch.red.team3Surrogate,
            },
            blue: {
              team1: _currentMatch.blue.team1,
              team2: _currentMatch.blue.team2,
              team3: _currentMatch.blue.team3,
              isTeam1Surrogate: _currentMatch.blue.team1Surrogate,
              isTeam2Surrogate: _currentMatch.blue.team2Surrogate,
              isTeam3Surrogate: _currentMatch.blue.team3Surrogate,
            },
            matchState: _currentMatch.state,
            finished: _currentMatch.finished,
            time: _currentMatch.start,
          };
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
            setRedReviewSubmitted(_currentMatch.red?.reviewSubmitted ?? false);
            setBlueReviewSubmitted(
              _currentMatch.blue?.reviewSubmitted ?? false
            );
            setMatchStartTime(_currentMatch.start);
            if (
              _currentMatch.red?.reviewSubmitted &&
              _currentMatch.blue?.reviewSubmitted
            ) {
              setFieldStatus("Submitted");
            } else {
              setFieldStatus("Review");
            }
          } else {
            setRedReady(_currentMatch.red?.initSubmitted ?? false);
            setBlueReady(_currentMatch.blue?.initSubmitted ?? false);
            setFieldStatus("Preparing");
          }
          setCurrentMatch(matchBrief);
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

      if (lastMessage.type === "REVIEW_SUBMITTED") {
        const _currentMatch = matches.find(
          (match) =>
            match.matchNumber === lastMessage.number &&
            match.field === fieldNumber
        );
        if (_currentMatch) {
          setBlueReviewSubmitted(lastMessage.blueReviewSubmitted);
          setRedReviewSubmitted(lastMessage.redReviewSubmitted);
          if (
            lastMessage.redReviewSubmitted &&
            lastMessage.blueReviewSubmitted
          ) {
            setFieldStatus("Submitted");
          } else {
            setFieldStatus("Review");
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
          setBlueReviewSubmitted(false);
          setRedReviewSubmitted(false);
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
    blueReviewSubmitted,
    redReviewSubmitted,
  };
};

export default useCurrentFieldMatch;
