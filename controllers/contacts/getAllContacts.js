import { Contact } from "../../models/index.js";
import { ctrlWrapper } from "../../decorators/index.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner }).populate("owner", "email");
  res.json(result);
};

export default ctrlWrapper(getAllContacts);
