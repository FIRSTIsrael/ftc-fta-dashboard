import { z } from "zod";

export const StoredData = z.object({
  endpoint: z.string(),
  events: z.string().array(),
});

export type StoredDataType = z.infer<typeof StoredData>;
