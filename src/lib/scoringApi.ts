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

export const isApiKeyActive = async (
  instance: AxiosInstance,
  apiKey: string
): Promise<boolean> =>
  deconstructFirstObject(
    instance
      .get(`keycheck/`, {
        headers: { Authorization: apiKey },
      })
      .then((res) => res.data),
    "active"
  );

export const waitForApiKey = async (
  instance: AxiosInstance,
  apiKey: string
): Promise<boolean> =>
  deconstructFirstObject(
    instance
      .get(`keywait/`, {
        headers: { Authorization: apiKey },
      })
      .then((res) => res.data),
    "active"
  );

export const requestApiKey = async (instance: AxiosInstance): Promise<string> =>
  deconstructFirstObject(
    instance.post(`keyrequest/?name=FTA+Dashboard`).then((res) => res.data),
    "key"
  );
