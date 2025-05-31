import z from 'zod';

export const AssetSchema = z.object({
  name: z.string().min(1),
  value: z.number().nonnegative(),
  clientId: z.number().optional(),
});
