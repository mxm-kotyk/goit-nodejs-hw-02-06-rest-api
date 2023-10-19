import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";
import { ctrlWrapper } from "../../decorators/index.js";
import User from "../../models/User.js";

const avatarsPath = path.resolve("public", "avatars");

const updateUserAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempPath, filename } = req.file;
  const avatar = await Jimp.read(tempPath);
  avatar.resize(250, 250).write(tempPath);
  const newFilename = `${_id}_${filename}`;
  const newPath = path.join(avatarsPath, newFilename);
  await fs.rename(tempPath, newPath);
  const avatarURL = path.join("public", "avatars", newFilename);
  const result = await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL: result.avatarURL });
};

export default ctrlWrapper(updateUserAvatar);
