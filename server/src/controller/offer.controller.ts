import { UserCookie } from "@/schema/user.schema";
import { prisma } from "@config/prisma";
import { Offer } from "@prisma/client";
import apiReponse from "@services/api.services";
import isArrayOrIsEmpty from "@utils/isArrayOrIsEmpty";
import { RequestHandler, Response } from "express";

function handleError(
  response: Response,
  status:
    | "Internal Server Error"
    | "Unauthorized"
    | "Not Found"
    | "Bad Request"
    | "Forbidden",
  message: string
) {
  return apiReponse.error(response, status, new Error(message));
}

export const getAllOffers: RequestHandler = async (_, res) => {
  try {
    const offers = await prisma.offer.findMany();

    const isNotEmptyOffers = isArrayOrIsEmpty(offers);

    return apiReponse.success(res, "Ok", isNotEmptyOffers ? offers : null);
  } catch (error) {
    return apiReponse.error(res, "Internal Server Error", error);
  }
};

export const getOfferById: RequestHandler = async (req, res) => {
  try {
    const { offerId } = req.params;

    if (!offerId) return handleError(res, "Not Found", "Id not found");

    const offer = await prisma.offer.findUnique({ where: { id: offerId } });

    if (!offer) return handleError(res, "Not Found", "Offer not found");

    return apiReponse.success(res, "Ok", offer);
  } catch (error) {
    return apiReponse.error(res, "Internal Server Error", error);
  }
};

export const getSerachedOffer: RequestHandler<
  {},
  {},
  {},
  { search: string }
> = async (req, res) => {
  try {
    const { search } = req.query;
    if (!search) return handleError(res, "Not Found", "Search text not found");

    const offers = await prisma.offer.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            company: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    const isNotEmptyOffers = isArrayOrIsEmpty(offers);

    return apiReponse.success(res, "Ok", isNotEmptyOffers ? offers : null);
  } catch (error) {
    return apiReponse.error(res, "Internal Server Error", error);
  }
};

export const createOffer: RequestHandler<{}, {}, Offer> = async (req, res) => {
  try {
    const user: UserCookie | undefined = req.cookies["info"];

    const {
      title,
      company,
      url,
      type,
      expireDate,
      location,
      status,
      applyDate,
    } = req.body;

    if (!user) return handleError(res, "Not Found", "User not found");

    if (!company || !url || !type || !status || !applyDate)
      return handleError(res, "Not Found", "Missing fields");

    const offer = await prisma.offer.create({
      data: {
        title: title ?? "NULL",
        company,
        url,
        type,
        expireDate: expireDate ?? "NULL",
        location: location ?? "NULL",
        status,
        applyDate,
        userId: user.id,
      },
    });

    return apiReponse.success(res, "Created", offer);
  } catch (error) {
    return apiReponse.error(res, "Internal Server Error", error);
  }
};

export const updateOffer: RequestHandler<
  { offerId: string },
  {},
  Offer
> = async (req, res) => {
  try {
    const { offerId } = req.params;
    const user: UserCookie | undefined = req.cookies["info"];

    const {
      title,
      company,
      url,
      type,
      expireDate,
      location,
      status,
      applyDate,
    } = req.body;

    if (!user) return handleError(res, "Not Found", "User not found");
    if (!offerId) return handleError(res, "Not Found", "Id not found");

    if (!company || !url || !type || !status || !applyDate)
      return handleError(res, "Not Found", "Missing fields");

    const offer = await prisma.offer.update({
      where: {
        id: offerId,
        userId: user.id,
      },
      data: {
        title: title ?? "NULL",
        company,
        url,
        type,
        expireDate: expireDate ?? "NULL",
        location: location ?? "NULL",
        status,
        applyDate,
      },
    });
    
    return apiReponse.success(res, "Ok", offer);
  } catch (error) {
    return apiReponse.error(res, "Internal Server Error", error);
  }
};

export const deleteOffer: RequestHandler = async (req, res) => {
  try {
    const { offerId } = req.params;

    if (!offerId) return handleError(res, "Not Found", "Id not found");

    await prisma.offer.delete({
      where: {
        id: offerId,
      },
    });

    return apiReponse.success(res, "Ok", null, `Offer ${offerId} deleted`);
  } catch (error) {
    return apiReponse.error(res, "Internal Server Error", error);
  }
};

export const deleteManyOffers: RequestHandler<
  {},
  {},
  { ids: string[] }
> = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!isArrayOrIsEmpty(ids))
      return handleError(res, "Not Found", "Ids required");

    const offers = await prisma.offer.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return apiReponse.success(
      res,
      "Ok",
      null,
      `Number of deleted offer : ${offers.count}`
    );
  } catch (error) {
    return apiReponse.error(res, "Internal Server Error", error);
  }
};
