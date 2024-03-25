import { ENDPOINT } from "@/constants";
import { Event } from "@/Models/event";
import { Match } from "@/Models/match";
import axios from "axios";

const instance = axios.create({
  baseURL: `http://${ENDPOINT}/api/v1/`,
});

const get = async (url: string, innerObjectName?: string) => {
  const response = await instance.get(url, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  return !!innerObjectName ? response.data[innerObjectName] : response.data;
};

export const getEvents = async (): Promise<string[]> =>
  get("events/", "eventCodes");

export const getEventInfo = async (eventCode: string): Promise<Event> =>
  get(`events/${eventCode}/`);

export const getMatches = async (eventCode: string): Promise<Match[]> =>
  get(`events/${eventCode}/matches/`, "matches");
