import { z } from "zod";

const Role = z.enum(["USER", "ADMIN"]);

export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  role: Role.default("USER"),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;
