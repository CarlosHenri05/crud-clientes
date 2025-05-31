import { boolean, z } from 'zod';

export const ClientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  status: boolean(),
  assets: z.array(
    z.object({
      name: z.string().min(1),
      value: z.number().nonnegative(),
      clientId: z.number().optional(),
    })
  ),
});
