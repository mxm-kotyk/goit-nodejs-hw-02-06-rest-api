import { ctrlWrapper } from "../../decorators/index.js";
import {
  HttpError,
  sendEmail,
  verificationEmailTemplate,
} from "../../helpers/index.js";
import { User } from "../../models/index.js";

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  await sendEmail(verificationEmailTemplate(email, user.verificationToken));

  res.status(200);
  res.json({ message: "Verification email sent" });
};

export default ctrlWrapper(resendVerificationEmail);
