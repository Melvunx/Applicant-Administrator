import { z } from "zod";

export const Role = z.enum(["USER", "ADMIN"]);

export const UserResponseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string(),
  role: Role.default("USER"),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;
