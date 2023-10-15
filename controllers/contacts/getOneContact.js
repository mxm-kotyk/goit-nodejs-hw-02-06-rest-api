import { Contact } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";

const getOneContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.findOne({ _id: id, owner }).populate(
    "owner",
    "email"
  );
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export default ctrlWrapper(getOneContact);
