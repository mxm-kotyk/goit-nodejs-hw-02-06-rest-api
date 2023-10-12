import express from "express";

import { contactController } from "../../controllers/index.js";
import { emptyBodyCheck, validIdCheck } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactValidationSchema,
  contactUpdateFavoriteSchema,
} from "../../schemas/index.js";

const validateContact = validateBody(contactValidationSchema);
const validateContactFavorite = validateBody(contactUpdateFavoriteSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", contactController.getAllContacts);

contactsRouter.get(
  "/:contactId",
  validIdCheck,
  contactController.getOneContact
);

contactsRouter.post(
  "/",
  emptyBodyCheck,
  validateContact,
  contactController.addContact
);

contactsRouter.delete(
  "/:contactId",
  validIdCheck,
  contactController.removeContact
);

contactsRouter.put(
  "/:contactId",
  validIdCheck,
  emptyBodyCheck,
  validateContact,
  contactController.updateContact
);

contactsRouter.patch(
  "/:contactId/favorite",
  validIdCheck,
  emptyBodyCheck,
  validateContactFavorite,
  contactController.updateStatusContact
);

export default contactsRouter;
