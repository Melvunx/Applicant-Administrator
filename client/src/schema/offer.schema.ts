import { z } from "zod";

const TypeOffer = z.enum(["SPONTANEOUS", "BYOFFER"]);
const Status = z.enum(["PENDING", "INTERVIEW", "REJECTED", "ACCEPTED"]);

export const OfferSchema = z.object({
  id: z.string().cuid(),
  title: z.string().nullable().optional(),
  type: TypeOffer.default("SPONTANEOUS"),
  company: z.string(),
  url: z.string().url(),
  applyDate: z.string().datetime(),
  location: z.string().nullable().optional(),
  expireDate: z.string().datetime().nullable().optional(),
  status: Status.default("PENDING"),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  userId: z.string().cuid(),
});

export type Offer = z.infer<typeof OfferSchema>;
