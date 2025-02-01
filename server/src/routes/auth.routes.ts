import { authenticate } from "@/middleware/authentication";
import {
  login,
  logout,
  refreshToken,
  register,
} from "@controller/auth.controller";
import { Router } from "express";
const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", authenticate, logout);

router.get("/refreshToken", refreshToken);

module.exports = router;
