import { z } from 'zod';

export const AssetSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  value: z.number().nonnegative('Value must be a non-negative number'),
  clientId: z.number().int().positive('clientId must be a positive integer').optional(), // clientId é opcional para POST, mas deve ser um número inteiro positivo
});

export const CreateAssetSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  value: z.number().nonnegative('Value must be a non-negative number'),
  clientId: z.number().int().positive('clientId must be a positive integer'),
});

export const UpdateAssetSchema = AssetSchema.partial().strict(); // Permite atualização parcial e não aceita campos extras

export const IdParamSchema = z.object({
  id: z.coerce.number().int().positive('ID must be a positive integer'), // z.coerce.number() para converter string para number
});

export const IdClientParamSchema = z.object({
  clientId: z.coerce.number().int().positive('ID must be a positive integer'),
});
