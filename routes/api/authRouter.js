import express from "express";

import { authController } from "../../controllers/index.js";
import { emptyBodyCheck } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { userValidationSchema } from "../../schemas/index.js";

const validateUser = validateBody(userValidationSchema);

const authRouter = express.Router();

authRouter.post(
  "/register",
  emptyBodyCheck,
  validateUser,
  authController.registerUser
);

authRouter.post(
  "/login",
  emptyBodyCheck,
  validateUser,
  authController.loginUser
);

export default authRouter;
