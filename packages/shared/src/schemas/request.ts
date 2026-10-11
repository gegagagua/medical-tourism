import { z } from 'zod';
import { PUBLIC_LOCALES, SOURCE_COUNTRIES, SPECIALTY_KEYS } from '../enums';

// Multi-step request shape (SPEC §4.1 — simplified to the fields the web form submits).
export const requestSchema = z.object({
  specialty: z.enum(SPECIALTY_KEYS),
  procedureKeys: z.array(z.string()).max(10),
  country: z.enum(SOURCE_COUNTRIES).optional(),
  travelStart: z.string().date().optional(),
  travelEnd: z.string().date().optional(),
  companions: z.number().int().min(0).max(5).default(0),
  language: z.enum(PUBLIC_LOCALES),
  contactName: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(5).max(32),
  telegram: z.string().max(64).optional(),
  consentProcessing: z.literal(true),
  consentSharing: z.literal(true),
  consentMarketing: z.boolean().optional(),
  // UTM attribution (CLAUDE.md §4.1).
  utm: z
    .object({
      source: z.string().max(64).optional(),
      medium: z.string().max(64).optional(),
      campaign: z.string().max(128).optional(),
      referrer: z.string().max(256).optional(),
      landing: z.string().max(256).optional(),
    })
    .optional(),
});

export type RequestInput = z.infer<typeof requestSchema>;
