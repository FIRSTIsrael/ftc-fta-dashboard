import { StoredDataType } from "./Models/storage";

export const LOCAL_STORAGE_KEY = "ftc-fta-dashboard-events";

export const DEFAULT_STORED_DATA: StoredDataType = {
  endpoint: "localhost",
  events: [],
};

export const BUTTONS_FADE_DELAY = 3000;

export const SEVEN_SEGMENT_DEFAULT_CHARACTER = "8";
export const DEFAULT_FIELDS_COUNT = 2;

export const MILLISECONDS_IN_SECOND = 1000;

export const GAME_AUTONOMOUS_LENGTH_SECONDS = 30;
export const GAME_TRANSITION_LENGTH_SECONDS = 8;
export const GAME_TELEOP_LENGTH_SECONDS = 120;
export const GAME_LENGTH_SECONDS =
  GAME_AUTONOMOUS_LENGTH_SECONDS +
  GAME_TRANSITION_LENGTH_SECONDS +
  GAME_TELEOP_LENGTH_SECONDS +
  // Add one second to include the first full second
  1;
