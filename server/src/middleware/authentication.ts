import { verifyToken } from "@/config/jsonwebtoken";
import colors from "@/schema/colors.schema";
import { UserCookie } from "@/schema/user.schema";
import apiReponse from "@/services/api.services";
import { Role } from "@prisma/client";
import { RequestHandler } from "express";

const checkAuth: RequestHandler = async (req, res, next) => {
  const token: string | undefined = req.cookies["refreshJwt"];
  const user: UserCookie | undefined = req.cookies["info"];

  console.log(colors.info("Authentication in progress..."));

  if (!user || !token)
    return apiReponse.error(
      res,
      "Unauthorized",
      new Error("Token or User not found")
    );

  const decoded = await verifyToken<{ userId: string }>(token);
  if (!decoded)
    return apiReponse.error(res, "Forbidden", new Error("Invalid token"));

  if (process.env.NODE_ENV !== "production") {
    console.log(colors.info(`User ${user.username} is authenticated`));
  }

  next();
};

const roleBasedAuth = (allowedRoles: Role[]): RequestHandler => {
  return (req, res, next) => {
    const user: UserCookie | undefined = req.cookies["info"];

    if (!user)
      return apiReponse.error(res, "Not Found", new Error("User not found"));

    if (!allowedRoles.includes(user.role))
      return apiReponse.error(
        res,
        "Unauthorized",
        new Error("You aren't authorized")
      );

    if (process.env.NODE_ENV !== "production") {
      console.log(colors.info(`User ${user.username} is authenticated`));
    }

    next();
  };
};

export const authenticate = checkAuth;

export const adminAuthenticate = roleBasedAuth([Role.ADMIN]);
