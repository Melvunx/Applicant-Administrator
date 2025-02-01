import colors from "@/schema/colors.schema";
import jwt, { JwtPayload } from "jsonwebtoken";

const { PUBLICKEY, SECRETKEY } = process.env;

if (!PUBLICKEY || !SECRETKEY) {
  throw new Error("PUBLIC and SECRET Key not defined");
}

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, PUBLICKEY, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, SECRETKEY, {
    expiresIn: "30d",
  });
};

export const verifyToken = async <T>(token: string) => {
  try {
    const decoded = await jwt.verify(token, SECRETKEY);

    return decoded as JwtPayload & T;
  } catch (error) {
    console.log(colors.error(error));
    return null;
  }
};
