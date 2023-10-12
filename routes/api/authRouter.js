import express from "express";

import { authController } from "../../controllers/index.js";
import { emptyBodyCheck } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  userSignInValidationSchema,
  userSignUpValidationSchema,
} from "../../schemas/index.js";

const validateSignUpUser = validateBody(userSignUpValidationSchema);
const validateSignInUser = validateBody(userSignInValidationSchema);

const authRouter = express.Router();

authRouter.post(
  "/register",
  emptyBodyCheck,
  validateSignUpUser,
  authController.register
);

export default authRouter;
