import { z } from "zod";

export const testMessage = "Hello, this is a test message from the schema package!";

export const wordSchema = z.object({
  definition: z.string(),
  term: z.string(),
});
