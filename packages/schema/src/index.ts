import { z } from 'zod';

export const testMessage = 'Hello, this is a test message from the schema package!';

export const wordSchema = z.object({
  id: z.string(),
  term: z.string(),
  definition: z.string(),
});

export type Word = z.infer<typeof wordSchema>;
