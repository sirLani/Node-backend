import express from "express";

// middleware
import { requireSignin } from "../middlewares";
// controllers
import {
  register,
  login,
  currentUser,
  forgotPassword,
} from "../controllers/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", requireSignin, currentUser);
router.post("/forgot-password", forgotPassword);

module.exports = router;
