import { useEffect, useState } from "react";
import useScoringWebsocket from "./api/useScoringWebsocket";
import { Match } from "@/Models/match";
import { FieldStatus } from "@/Models/fieldStatus";
import { AllianceStatus } from "@/Models/allianceStatus";
import { INITIAL_ALLIANCE_STATUS } from "@/constants";
import useEventMatches from "./api/useEventMatches";

const useCurrentFieldMatch = (eventCode: string, fieldNumber: number) => {
  const [currentMatch, setCurrentMatch] = useState<Match>();
  const [fieldStatus, setFieldStatus] = useState<FieldStatus>("Standby");
  const [redStatus, setRedStatus] = useState<AllianceStatus>(
    INITIAL_ALLIANCE_STATUS
  );
  const [blueStatus, setBlueStatus] = useState<AllianceStatus>(
    INITIAL_ALLIANCE_STATUS
  );
  const [matchStartTime, setMatchStartTime] = useState<number>();
  const { lastMessage } = useScoringWebsocket(eventCode);
  const { data: matches, refetch } = useEventMatches(eventCode);

  useEffect(() => {
    if (lastMessage && lastMessage.type !== "PONG") {
      //TODO: Remove
      console.log(lastMessage);
    }
    if (matches && matches.length === 0) {
      //TODO: This line is being called a lot. Fix it.
      refetch();
    }

    if (matches && lastMessage) {
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
            setRedStatus((prev) => ({
              ...prev,
              autoSubmitted: _currentMatch.red?.autoSubmitted ?? false,
              teleopSubmitted: _currentMatch.red?.teleopSubmitted ?? false,
              reviewSubmitted: _currentMatch.red?.reviewSubmitted ?? false,
            }));
            setBlueStatus((prev) => ({
              ...prev,
              autoSubmitted: _currentMatch.blue?.autoSubmitted ?? false,
              teleopSubmitted: _currentMatch.blue?.teleopSubmitted ?? false,
              reviewSubmitted: _currentMatch.blue?.reviewSubmitted ?? false,
            }));
            setMatchStartTime(_currentMatch.start);
            setFieldStatus(
              _currentMatch.red?.reviewSubmitted &&
                _currentMatch.blue?.reviewSubmitted
                ? "Submitted"
                : "Review"
            );
          } else {
            setRedStatus((prev) => ({
              ...prev,
              initSubmitted: _currentMatch.red?.initSubmitted ?? false,
            }));
            setBlueStatus((prev) => ({
              ...prev,
              initSubmitted: _currentMatch.blue?.initSubmitted ?? false,
            }));
            setFieldStatus("Preparing");
          }
          setCurrentMatch(matchBrief);
        }
      } else if (lastMessage.type === "MATCH_LOAD") {
        const _currentMatch = matches.find(
          (match) =>
            match.matchNumber === lastMessage.number &&
            match.field === fieldNumber
        );
        if (_currentMatch) {
          setFieldStatus("Preparing");
          setRedStatus(INITIAL_ALLIANCE_STATUS);
          setBlueStatus(INITIAL_ALLIANCE_STATUS);
          setCurrentMatch(_currentMatch);
        }
      } else if (lastMessage.type === "MATCH_STARTED") {
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
      } else if (lastMessage.type === "MATCH_ABORT") {
        const _currentMatch = matches.find(
          (match) =>
            match.matchNumber === lastMessage.number &&
            match.field === fieldNumber
        );
        if (_currentMatch) {
          setFieldStatus("Aborted");
          setCurrentMatch(_currentMatch);
          setRedStatus(INITIAL_ALLIANCE_STATUS);
          setBlueStatus(INITIAL_ALLIANCE_STATUS);
          setMatchStartTime(0);
        }
      } else if (lastMessage.type === "MATCH_INIT") {
        const _currentMatch = matches.find(
          (match) =>
            match.matchNumber === lastMessage.number &&
            match.field === fieldNumber
        );
        if (_currentMatch) {
          if (fieldStatus !== "In-Game") {
            setRedStatus((prev) => ({
              ...prev,
              initSubmitted: lastMessage.redInitSubmitted,
            }));
            setBlueStatus((prev) => ({
              ...prev,
              initSubmitted: lastMessage.blueInitSubmitted,
            }));
            if (lastMessage.redInitSubmitted && lastMessage.blueInitSubmitted) {
              setFieldStatus("Ready");
            } else {
              setFieldStatus("Preparing");
            }
            setCurrentMatch(_currentMatch);
          }
        }
      } else if (lastMessage.type === "REVIEW_SUBMITTED") {
        const _currentMatch = matches.find(
          (match) =>
            match.matchNumber === lastMessage.number &&
            match.field === fieldNumber
        );
        if (_currentMatch) {
          setRedStatus((prev) => ({
            ...prev,
            reviewSubmitted: lastMessage.redReviewSubmitted,
          }));
          setBlueStatus((prev) => ({
            ...prev,
            reviewSubmitted: lastMessage.blueReviewSubmitted,
          }));
          if (
            lastMessage.redReviewSubmitted &&
            lastMessage.blueReviewSubmitted
          ) {
            setFieldStatus("Submitted");
          } else {
            setFieldStatus("Review");
          }
        }
      } else if (lastMessage.type === "TELEOP_SUBMITTED") {
        if (lastMessage.alliance === "RED") {
          setRedStatus((prev) => ({
            ...prev,
            teleopSubmitted: true,
          }));
        } else {
          setBlueStatus((prev) => ({
            ...prev,
            teleopSubmitted: true,
          }));
        }
      } else if (lastMessage.type === "MATCH_COMMIT") {
        const _currentMatch = matches.find(
          (match) =>
            match.matchNumber === lastMessage.number &&
            match.field === fieldNumber
        );
        if (_currentMatch) {
          setFieldStatus("Reset");
          setCurrentMatch(undefined);
          setMatchStartTime(undefined);
          setRedStatus(INITIAL_ALLIANCE_STATUS);
          setBlueStatus(INITIAL_ALLIANCE_STATUS);
        }
      }
    }
  }, [lastMessage, matches, fieldNumber]);

  return {
    currentMatch,
    matchStartTime,
    fieldStatus,
    redStatus,
    blueStatus,
  };
};

export default useCurrentFieldMatch;
