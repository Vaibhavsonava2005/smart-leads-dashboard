import { z } from 'zod';
import { LeadStatus, LeadSource } from '../interfaces/lead.interface';

export const createLeadValidator = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    status: z.nativeEnum(LeadStatus).optional(),
    source: z.nativeEnum(LeadSource),
  }),
});

export const updateLeadValidator = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    status: z.nativeEnum(LeadStatus).optional(),
    source: z.nativeEnum(LeadSource).optional(),
  }),
});
