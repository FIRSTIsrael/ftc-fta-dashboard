import { MatchAlliance } from "./matchAlliance";

export interface Match {
  red: MatchAlliance;
  field: number;
  blue: MatchAlliance;
  matchName: string;
  matchState: string;
  finished: boolean;
  time: number;
  matchNumber: number;
}
