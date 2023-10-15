import { Contact } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";

const getOneContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOne({ _id: contactId, owner }).populate(
    "owner",
    "email"
  );
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export default ctrlWrapper(getOneContact);
