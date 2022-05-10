import * as z from "zod";

export const eventSchema = z.object({
  id: z.string(),
  label: z.string(),
});

export type Event = z.infer<typeof eventSchema>;
