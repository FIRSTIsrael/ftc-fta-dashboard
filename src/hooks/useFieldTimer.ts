import { useEffect, useState } from "react";
import useCurrentTime from "@/hooks/useCurrentTime";
import { GAME_LENGTH_SECONDS, MILLISECONDS_IN_SECOND } from "@/constants";
import { getGameStateByTime } from "@/lib/gameStates";

const useFieldTimer = (matchStartTimeMillis: number) => {
  const { epoch, synced } = useCurrentTime();
  const [fieldTimer, setFieldTimer] = useState<{
    minutes: number;
    seconds: number;
  }>({
    minutes: 0,
    seconds: 0,
  });
  // TODO: Something is broken here with the seconds and milliseconds
  const secondsUntilGameEnd =
    matchStartTimeMillis - epoch + GAME_LENGTH_SECONDS;

  const gameState = getGameStateByTime(
    matchStartTimeMillis,
    secondsUntilGameEnd
  );

  useEffect(() => {
    if (matchStartTimeMillis === 0) {
      setFieldTimer({
        minutes: 0,
        seconds: 0,
      });
    } else {
      setFieldTimer({
        minutes: Math.max(0, Math.floor(secondsUntilGameEnd / 60000)),
        seconds: Math.max(0, Math.floor((secondsUntilGameEnd % 60000) / 1000)),
      });
    }
  }, [matchStartTimeMillis, epoch, secondsUntilGameEnd]);

  return { fieldTimer, synced, gameState };
};

export default useFieldTimer;
