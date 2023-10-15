import { ctrlWrapper } from "../../decorators/index.js";

const getCurrentUser = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.status(200);
  res.json({ email, subscription });
};

export default ctrlWrapper(getCurrentUser);
