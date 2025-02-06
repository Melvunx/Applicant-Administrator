import { z } from "zod";

const TypeOffer = z.enum(["SPONTANEOUS", "BYOFFER"]);
const Status = z.enum(["PENDING", "INTERVIEW", "REJECTED", "ACCEPTED"]);

export const OfferSchema = z.object({
  id: z.string().cuid(),
  title: z.string().optional(),
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

export const OfferResponseDataSchema = z.object({
  title: z.string(),
  type: TypeOffer.default("SPONTANEOUS"),
  company: z.string(),
  url: z.string().url(),
  applyDate: z.date(),
  location: z.string(),
  expireDate: z.date().optional(),
  status: Status.default("PENDING"),
  userId: z.string().cuid(),
});

export const OffersSchema = z.array(OfferSchema);
export type OfferResponseData = z.infer<typeof OfferResponseDataSchema>;
export type Offer = z.infer<typeof OfferSchema>;
