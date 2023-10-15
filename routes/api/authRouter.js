import express from "express";

import { authController } from "../../controllers/index.js";
import {
  authenticate,
  emptyBodyCheck,
  validIdCheck,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  userSubscriptionValidation,
  userValidationSchema,
} from "../../schemas/index.js";

const validateUser = validateBody(userValidationSchema);
const validateSubscription = validateBody(userSubscriptionValidation);

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

authRouter.get("/current", authenticate, authController.getCurrentUser);

authRouter.post("/logout", authenticate, authController.logoutUser);

authRouter.patch(
  "/:id/subscription",
  validIdCheck,
  authenticate,
  emptyBodyCheck,
  validateSubscription,
  authController.updateUserSubscription
);

export default authRouter;
