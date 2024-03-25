import {
  GAME_AUTONOMOUS_LENGTH_SECONDS,
  GAME_LENGTH_SECONDS,
  GAME_TRANSITION_LENGTH_SECONDS,
} from "@/constants";
import { GameState } from "@/Models/gameState";

export const getGameStateByTime = (
  matchStartTimeMillis: number,
  secondsUntilGameEnd: number
): GameState => {
  if (matchStartTimeMillis === 0) {
    // Game not started yet
    return "Preparing";
  }

  if (
    secondsUntilGameEnd >
    GAME_LENGTH_SECONDS - GAME_AUTONOMOUS_LENGTH_SECONDS
  ) {
    return "Autonomous";
  } else if (
    secondsUntilGameEnd >
    GAME_LENGTH_SECONDS -
      GAME_AUTONOMOUS_LENGTH_SECONDS -
      GAME_TRANSITION_LENGTH_SECONDS
  ) {
    return "Transition";
  } else if (secondsUntilGameEnd > 0) {
    return "TeleOP";
  } else if (secondsUntilGameEnd === 0) {
    return "Review";
  }

  return "Preparing";
};
