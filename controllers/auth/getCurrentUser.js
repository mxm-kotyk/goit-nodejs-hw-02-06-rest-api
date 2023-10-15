import { ctrlWrapper } from "../../decorators/index.js";

const getCurrentUser = async (req, res, next) => {
  const { email, subscription, _id } = req.user;
  res.status(200);
  res.json({ email, subscription, _id });
};

export default ctrlWrapper(getCurrentUser);
