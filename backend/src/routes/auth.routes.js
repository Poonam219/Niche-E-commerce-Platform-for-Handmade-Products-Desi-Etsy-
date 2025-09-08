import { Router } from "express";
import Joi from "joi";
import { validate } from "../middleware/validate.js";
import { register, login, me } from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
  role: Joi.string().valid("artisan","customer","admin").default("customer")
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", auth(), me);

export default router;
