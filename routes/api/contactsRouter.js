import express from "express";

import { contactController } from "../../controllers/index.js";
import {
  authenticate,
  emptyBodyCheck,
  validIdCheck,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactValidationSchema,
  contactUpdateFavoriteSchema,
} from "../../schemas/index.js";

const validateContact = validateBody(contactValidationSchema);
const validateContactFavorite = validateBody(contactUpdateFavoriteSchema);

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactController.getAllContacts);

contactsRouter.get("/:id", validIdCheck, contactController.getOneContact);

contactsRouter.post(
  "/",
  emptyBodyCheck,
  validateContact,
  contactController.addContact
);

contactsRouter.delete("/:id", validIdCheck, contactController.removeContact);

contactsRouter.put(
  "/:id",
  validIdCheck,
  emptyBodyCheck,
  validateContact,
  contactController.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  validIdCheck,
  emptyBodyCheck,
  validateContactFavorite,
  contactController.updateStatusContact
);

export default contactsRouter;
