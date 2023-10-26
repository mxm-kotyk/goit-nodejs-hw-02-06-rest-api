import express from "express";

import { authController } from "../../controllers/index.js";
import {
  authenticate,
  emptyBodyCheck,
  upload,
  validIdCheck,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  userSubscriptionValidation,
  userValidationSchema,
  userResendVerification,
} from "../../schemas/index.js";

const validateUser = validateBody(userValidationSchema);
const validateSubscription = validateBody(userSubscriptionValidation);
const validateResendVerification = validateBody(userResendVerification);

const authRouter = express.Router();

authRouter.post(
  "/register",
  emptyBodyCheck,
  validateUser,
  authController.registerUser
);

authRouter.get("/verify/:verificationToken", authController.verifyUser);

authRouter.post(
  "/verify",
  validateResendVerification,
  authController.resendVerificationEmail
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

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateUserAvatar
);

export default authRouter;
