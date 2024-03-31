"use client";

import { type AxiosInstance } from "axios";
import { type Event } from "@/Models/event";
import { type Match } from "@/Models/match";
import { deconstructFirstObject, get } from "@/lib/api";

export const getEvents = async (instance: AxiosInstance): Promise<string[]> =>
  deconstructFirstObject(get(instance, "events/"), "eventCodes");

export const getEventInfo = async (
  instance: AxiosInstance,
  eventCode: string
): Promise<Event> => get(instance, `events/${eventCode}/`);

export const getMatches = async (
  instance: AxiosInstance,
  eventCode: string
): Promise<Match[]> =>
  deconstructFirstObject(
    get(instance, `events/${eventCode}/matches/`),
    "matches"
  );
