import { z } from 'zod';
import { CALL_TYPES, PUBLIC_LOCALES } from '../enums';

// 15-min free call booking (SPEC §4.12). Visitor does not need an account.
export const bookingSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(5).max(32),
  language: z.enum(PUBLIC_LOCALES),
  callType: z.enum(CALL_TYPES),
  procedureKey: z.string().min(1).optional(),
  slotStart: z.string().datetime(),
  timezone: z.string().min(1),
  consent: z.literal(true),
  marketingConsent: z.boolean().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
