import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "@/config/jsonwebtoken";
import { prisma } from "@/config/prisma";
import colors from "@/schema/colors.schema";
import { UserCookie } from "@/schema/user.schema";
import { Session, User } from "@prisma/client";
import apiResponse from "@services/api.services";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";

const { SALT_ROUNDS } = process.env;

if (!SALT_ROUNDS) {
  throw new Error("Salt round not found");
}

export const register: RequestHandler<{}, {}, User> = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return apiResponse.error(
        res,
        "Not Found",
        new Error("Missing credentials")
      );

    let existUser: User | null = null;

    existUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existUser)
      return apiResponse.error(
        res,
        "Bad Request",
        new Error("Email already exists")
      );

    existUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existUser)
      return apiResponse.error(
        res,
        "Bad Request",
        new Error("Username already exists")
      );

    const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(colors.success(`New user ${user.username} created`));

    return apiResponse.success(res, "Created", {
      id: user.id,
      username: user.username,
      email,
      role: user.role,
    });
  } catch (error) {
    return apiResponse.error(res, "Internal Server Error", error);
  }
};

export const login: RequestHandler<
  {},
  {},
  { email: string; password: string }
> = async (req, res) => {
  try {
    const { email, password } = req.body;
    const now = new Date();

    let session: Session | null = null;

    if (!email || !password)
      return apiResponse.error(
        res,
        "Not Found",
        new Error("Missing credentials")
      );

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      return apiResponse.error(res, "Bad Request", new Error("Invalid email"));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return apiResponse.error(
        res,
        "Bad Request",
        new Error("Invalid password")
      );

    session = await prisma.session.findFirst({
      where: {
        userId: user.id,
      },
    });

    const refreshToken = generateRefreshToken(user.id);

    if (session && new Date(session.expireAt) > now) {
      await prisma.session.delete({
        where: {
          id: session.id,
        },
      });

      session = null;
    }

    if (!session) {
      console.log("Session not found");

      session = await prisma.session.create({
        data: {
          userId: user.id,
          token: refreshToken,
          expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
    }

    res.cookie("refreshJwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });

    res.cookie(
      "info",
      { id: user.id, username: user.username, email, role: user.role },
      {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000,
      }
    );

    console.log(colors.success(`User ${user.username} logged in successfully`));

    return apiResponse.success(
      res,
      "Ok",
      { id: user.id, username: user.username, email, role: user.role },
      `User ${user.username} logged in successfully`
    );
  } catch (error) {
    console.error(colors.error("Error logging in user (server) : ", error));
    return apiResponse.error(res, "Internal Server Error", error);
  }
};

export const refreshToken: RequestHandler = async (req, res) => {
  try {
    const token: string | undefined = req.cookies.refreshJwt;

    if (!token)
      return apiResponse.error(res, "Not Found", new Error("Token not found"));

    const decoded = await verifyToken<{ userId: string }>(token);

    if (!decoded)
      return apiResponse.error(res, "Forbidden", new Error("Invalid token"));

    const newAccessToken = generateAccessToken(decoded.userId);

    return apiResponse.success(res, "Created", { accessToken: newAccessToken });
  } catch (error) {
    return apiResponse.error(res, "Internal Server Error", error);
  }
};

export const auth: RequestHandler = async (req, res) => {
  try {
    const user: UserCookie | undefined = req.cookies["info"];

    if (!user)
      return apiResponse.error(
        res,
        "Unauthorized",
        new Error("Token or User not found")
      );

    return apiResponse.success(res, "Ok", user, "User is authenticated");
  } catch (error) {
    return apiResponse.error(res, "Internal Server Error", error);
  }
};

export const logout: RequestHandler = async (req, res) => {
  try {
    const token: string | undefined = req.cookies["refreshJwt"];
    const user: UserCookie | undefined = req.cookies["info"];

    if (!token || !user)
      return apiResponse.error(
        res,
        "Not Found",
        new Error("Session or User not found")
      );

    const session = await prisma.session.findFirstOrThrow({
      where: {
        userId: user.id,
      },
    });

    await prisma.session.delete({
      where: {
        id: session.id,
      },
    });

    res.clearCookie("refreshJwt");
    res.clearCookie("info");

    return apiResponse.success(res, "Ok", null, "User logged out successfully");
  } catch (error) {
    return apiResponse.error(res, "Internal Server Error", error);
  }
};

export const getUsers: RequestHandler = async (req, res) => {
  try {
  } catch (error) {
    return apiResponse.error(res, "Internal Server Error", error);
  }
};
