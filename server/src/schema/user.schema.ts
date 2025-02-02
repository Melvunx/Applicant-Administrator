import { z } from "zod";

const Role = z.enum(["USER", "ADMIN"]);

export const UserCookieSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  role: Role,
});

export type UserCookie = z.infer<typeof UserCookieSchema>;
