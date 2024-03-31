export const eventsKeyFactory = {
  all: ["events"] as const,
  event: (eventCode: string) => [...eventsKeyFactory.all, eventCode],
  info: (eventCode: string) =>
    [...eventsKeyFactory.event(eventCode), "info"] as const,
  matches: (eventCode: string) =>
    [...eventsKeyFactory.event(eventCode), "matches"] as const,
};
