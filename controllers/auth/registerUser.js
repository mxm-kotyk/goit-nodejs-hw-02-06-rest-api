import bcrypt from "bcryptjs";

import { User } from "../../models/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import HttpError from "../../helpers/HttpError.js";

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashedPassword });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

export default ctrlWrapper(registerUser);
