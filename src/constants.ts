import { QueryClientConfig } from "@tanstack/react-query";
import { AllianceStatus } from "./Models/allianceStatus";
import { StoredDataType } from "./Models/storage";

export const LOCAL_STORAGE_KEY = "ftc-fta-dashboard-events";

export const DEFAULT_STORED_DATA: StoredDataType = {
  endpoint: "localhost",
  apiKey: "",
  events: [],
};

export const INITIAL_ALLIANCE_STATUS: AllianceStatus = {
  initSubmitted: false,
  autoSubmitted: false,
  teleopSubmitted: false,
  reviewSubmitted: false,
};

export const REACT_QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000,
    },
  },
};

export const BUTTONS_FADE_DELAY = 3000;

export const SEVEN_SEGMENT_DEFAULT_CHARACTER = "8";
export const DEFAULT_FIELDS_COUNT = 2;

export const MILLISECONDS_IN_SECOND = 1000;

export const REFETCH_MATCHES_INTERVAL = 10 * 60 * 1000; // 10 minutes
export const MATCHES_FETCH_STALE_TIME = 60 * 1000; // 1 minute
export const DEFAULT_TIMER_INTERVAL = 250;

export const GAME_AUTONOMOUS_LENGTH_SECONDS = 30;
export const GAME_TRANSITION_LENGTH_SECONDS = 8;
export const GAME_TELEOP_LENGTH_SECONDS = 120;
export const GAME_LENGTH_SECONDS =
  GAME_AUTONOMOUS_LENGTH_SECONDS +
  GAME_TRANSITION_LENGTH_SECONDS +
  GAME_TELEOP_LENGTH_SECONDS +
  // Add one second to include the first full second
  1;
