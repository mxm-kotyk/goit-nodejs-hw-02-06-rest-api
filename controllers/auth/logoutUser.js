import { ctrlWrapper } from "../../decorators/index.js";
import { User } from "../../models/index.js";

const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: "" });
  res.status(204);
  res.end();
};

export default ctrlWrapper(logoutUser);
