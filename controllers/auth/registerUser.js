import bcrypt from "bcryptjs";
import gravatar from "gravatar";

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
  const avatarURL = gravatar.url(email, {
    protocol: "https",
    size: 250,
    d: "robohash",
  });

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
  });

  res.status(201);
  res.json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

export default ctrlWrapper(registerUser);
