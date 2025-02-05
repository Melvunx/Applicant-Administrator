import { Offer, OfferSchema, OffersSchema } from "@/schema/offer.schema";
import fetchApi from "./fetch";

type FetchParams = {
  offerId?: string;
  navigate: (path: string) => void;
  requiresToken?: boolean;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
};

export async function getOffers({
  navigate,
  requiresToken = true,
  accessToken,
  setAccessToken,
}: FetchParams) {
  try {
    const offers = await fetchApi<Offer[] | null>("/offers", {
      navigate,
      requiresToken,
      accessToken,
      setAccessToken,
    });

    const validatedData = OffersSchema.parse(offers);
    return validatedData;
  } catch (error) {
    console.error(error);
  }
}

export async function getOfferId({
  offerId,
  navigate,
  requiresToken = true,
  accessToken,
  setAccessToken,
}: FetchParams) {
  if (!offerId) {
    throw new Error("Offer ID is required");
  }

  try {
    const offer = await fetchApi<Offer>(`/offers/offer/${offerId}`, {
      navigate,
      requiresToken,
      accessToken,
      setAccessToken,
    });

    const validatedData = OfferSchema.parse(offer);
    return validatedData;
  } catch (error) {
    console.error(error);
  }
}
