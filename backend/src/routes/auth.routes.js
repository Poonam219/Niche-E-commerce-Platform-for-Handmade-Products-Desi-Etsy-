import { Router } from "express";
import Joi from "joi";
import { validate } from "../middleware/validate.js";
import { register, login, me } from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

const base = {
  name: Joi.string().min(2).max(60).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
  role: Joi.string().valid("customer","artisan").default("customer") // never let "admin" come from user
};

const artisanProfileSchema = Joi.object({
  shopName: Joi.string().min(2).max(80).required(),
  bio: Joi.string().min(20).max(1000).required(),
  portfolioUrl: Joi.string().uri().optional(),
  instagram: Joi.string().optional(),
  facebook: Joi.string().optional(),
  website: Joi.string().optional()
});

const registerSchema = Joi.alternatives().try(
  // Customer
  Joi.object({
    ...base,
    role: Joi.valid("customer").default("customer")
  }),
  // Artisan
  Joi.object({
    ...base,
    role: Joi.valid("artisan").required(),
    artisanProfile: artisanProfileSchema.required()
  })
);

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", auth(), me);

export default router;
