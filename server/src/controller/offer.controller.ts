import colors from "@/schema/colors.schema";
import { UserCookie } from "@/schema/user.schema";
import { prisma } from "@config/prisma";
import { Offer } from "@prisma/client";
import apiResponse from "@services/api.services";
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
  return apiResponse.error(response, status, new Error(message));
}

export const getAllOffers: RequestHandler = async (req, res) => {
  try {
    const user: UserCookie | undefined = req.cookies["info"];
    if (!user) return handleError(res, "Unauthorized", "User not found");

    console.log(colors.info("Geting all offers..."));

    const offers = await prisma.offer.findMany({
      where: {
        userId: user.id,
      },
    });

    offers.length > 0
      ? console.log(colors.success("Offers found : ", offers.length))
      : console.log(colors.error("No offers found"));

    return apiResponse.success(res, "Ok", offers);
  } catch (error) {
    return apiResponse.error(res, "Internal Server Error", error);
  }
};

export const getOfferById: RequestHandler = async (req, res) => {
  try {
    const { offerId } = req.params;

    if (!offerId) return handleError(res, "Not Found", "Id not found");

    console.log(colors.info("Geting offer..."));

    const offer = await prisma.offer.findUnique({ where: { id: offerId } });

    if (!offer) return handleError(res, "Not Found", "Offer not found");

    console.log(colors.info("Offer get successfully"));

    return apiResponse.success(res, "Ok", offer);
  } catch (error) {
    return apiResponse.error(res, "Internal Server Error", error);
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

    console.log(colors.info(`Looking for offer like ${search} ...`));

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

    offers.length > 0
      ? console.log(colors.success("Offers found : ", offers.length))
      : console.log(colors.error("No offers found"));

    return apiResponse.success(res, "Ok", offers);
  } catch (error) {
    return apiResponse.error(res, "Internal Server Error", error);
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

    console.log(colors.info("Creating new offer..."));

    await prisma.offer.create({
      data: {
        title: title ?? "NULL",
        company,
        url,
        type,
        expireDate: expireDate ?? undefined,
        location: location ?? "NULL",
        status,
        applyDate,
        userId: user.id,
      },
    });

    console.log(colors.success("Offer created successfully."));

    return apiResponse.success(res, "Created", { title, type, company });
  } catch (error) {
    return apiResponse.error(res, "Internal Server Error", error);
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

    console.log(colors.info("Updating offer..."));

    await prisma.offer.update({
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

    console.log(colors.success("Offer updated successfully"));

    return apiResponse.success(res, "Ok", { title, type, company });
  } catch (error) {
    return apiResponse.error(res, "Internal Server Error", error);
  }
};

export const deleteOffer: RequestHandler = async (req, res) => {
  try {
    const { offerId } = req.params;

    if (!offerId) return handleError(res, "Not Found", "Id not found");

    console.log(colors.info("Deleting offer..."));

    await prisma.offer.delete({
      where: {
        id: offerId,
      },
    });

    console.log(colors.success("Offer deleted successfully"));

    return apiResponse.success(res, "Ok", null, `Offer ${offerId} deleted`);
  } catch (error) {
    return apiResponse.error(res, "Internal Server Error", error);
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

    console.log(colors.info("Deleting offers..."));

    const offers = await prisma.offer.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    console.log(colors.success("Offers deleted successfully"));

    return apiResponse.success(
      res,
      "Ok",
      null,
      `Number of deleted offer : ${offers.count}`
    );
  } catch (error) {
    return apiResponse.error(res, "Internal Server Error", error);
  }
};
