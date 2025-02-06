import {
  Offer,
  OfferResponseData,
  OfferSchema,
  OffersSchema,
} from "@/schema/offer.schema";
import fetchApi from "./fetch";

type FetchOfferParams = {
  offerId?: string;
  offerIds?: string[];
  query?: string;
  data?: OfferResponseData;
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
}: FetchOfferParams) {
  try {
    const offers = await fetchApi<Offer[]>("/offers", {
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
}: FetchOfferParams) {
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

export async function searchOffers({
  query,
  navigate,
  requiresToken = true,
  accessToken,
  setAccessToken,
}: FetchOfferParams) {
  if (!query) {
    throw new Error("Offer ID is required");
  }

  try {
    const offers = await fetchApi<Offer[]>(`/offers/offer?search=${query}`, {
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

export async function createOffer({
  navigate,
  data,
  requiresToken = true,
  accessToken,
  setAccessToken,
}: FetchOfferParams) {
  try {
    const response = await fetchApi<{
      title: string | null;
      type: "SPONTANEOUS" | "BYOFFER";
      company: string;
    }>("/offers/new", {
      payload: data,
      navigate,
      requiresToken,
      accessToken,
      setAccessToken,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function updateOffer({
  offerId,
  navigate,
  data,
  requiresToken = true,
  accessToken,
  setAccessToken,
}: FetchOfferParams) {
  if (!offerId) {
    throw new Error("Offer ID is required");
  }

  try {
    const response = await fetchApi<{
      title: string | null;
      type: "SPONTANEOUS" | "BYOFFER";
      company: string;
    }>(`/offers/offer/${offerId}`, {
      payload: data,
      navigate,
      requiresToken,
      accessToken,
      setAccessToken,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteOffer({
  offerId,
  navigate,
  requiresToken = true,
  accessToken,
  setAccessToken,
}: FetchOfferParams) {
  if (!offerId) {
    throw new Error("Offer ID is required");
  }

  try {
    const response = await fetchApi<string>(`/offers/${offerId}`, {
      navigate,
      requiresToken,
      accessToken,
      setAccessToken,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteOffers({
  offerIds,
  navigate,
  requiresToken = true,
  accessToken,
  setAccessToken,
}: FetchOfferParams) {
  try {
    const response = await fetchApi<string>("/offers/many", {
      payload: { ids: offerIds },
      navigate,
      requiresToken,
      accessToken,
      setAccessToken,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}
