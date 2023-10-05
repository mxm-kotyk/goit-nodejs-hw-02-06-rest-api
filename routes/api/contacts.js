import express from "express";

import contactController from "../../controllers/contactsController.js";
import { emptyBodyCheck, validIdCheck } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactValidationSchema,
  contactUpdateFavoriteSchema,
} from "../../models/Contact.js";

const validateContact = validateBody(contactValidationSchema);
const validateContactFavorite = validateBody(contactUpdateFavoriteSchema);

const router = express.Router();

router.get("/", contactController.getAll);

router.get("/:contactId", validIdCheck, contactController.getOne);

router.post("/", emptyBodyCheck, validateContact, contactController.add);

router.delete("/:contactId", validIdCheck, contactController.remove);

router.put(
  "/:contactId",
  validIdCheck,
  emptyBodyCheck,
  validateContact,
  contactController.update
);

router.patch(
  "/:contactId/favorite",
  validIdCheck,
  emptyBodyCheck,
  validateContactFavorite,
  contactController.updateStatusContact
);

export default router;
