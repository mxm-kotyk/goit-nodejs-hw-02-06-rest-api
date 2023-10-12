import { Contact } from "../../models/index.js";
import { ctrlWrapper } from "../../decorators/index.js";

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

export default ctrlWrapper(getAllContacts);
