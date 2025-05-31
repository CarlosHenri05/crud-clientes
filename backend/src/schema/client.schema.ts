import { z } from 'zod';

export const ClientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  status: z.boolean().default(true),
});

export const CreateClientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  status: z.boolean().default(true),
});

export const UpdateClientSchema = ClientSchema.partial().strict();

export const PutClientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  status: z.boolean(),
});

export const IdParamSchema = z.object({
  id: z.coerce.number().int().positive('ID must be a positive integer'),
});
