import colors from "@/schema/colors.schema";
import apiReponse from "@/services/api.services";
import { Role, User } from "@prisma/client";
import { RequestHandler } from "express";

const checkAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies["refreshJwt"];
  const user: User = req.cookies["info"];

  console.log(colors.info("Authentication in progress..."));

  if (!user || !token)
    return apiReponse.error(
      res,
      "Not Found",
      new Error("Token or User not found")
    );

  if (process.env.NODE_ENV !== "production") {
    console.log(colors.info(`User ${user.username} is authenticated`));
  }

  next();
};

const roleBasedAuth = (allowedRoles: Role[]): RequestHandler => {
  return (req, res, next) => {
    const user: User = req.cookies["info"];

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
