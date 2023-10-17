import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { User } from "../../models/index.js";

const updateUserSubscription = async (req, res) => {
  const { id } = req.params;

  if (req.user._id.toString() !== id) {
    throw HttpError(401);
  }

  const result = await User.findOneAndUpdate({ _id: id }, req.body);

  if (!result) {
    throw HttpError(404);
  }

  res.json({ email: result.email, subscription: result.subscription });
};

export default ctrlWrapper(updateUserSubscription);
