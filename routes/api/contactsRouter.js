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

const router = express.Router();

router.get("/", contactController.getAllContacts);

router.get("/:contactId", validIdCheck, contactController.getOneContact);

router.post("/", emptyBodyCheck, validateContact, contactController.addContact);

router.delete("/:contactId", validIdCheck, contactController.removeContact);

router.put(
  "/:contactId",
  validIdCheck,
  emptyBodyCheck,
  validateContact,
  contactController.updateContact
);

router.patch(
  "/:contactId/favorite",
  validIdCheck,
  emptyBodyCheck,
  validateContactFavorite,
  contactController.updateStatusContact
);

export default router;
