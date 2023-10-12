import { Schema, model } from "mongoose";

import hooks from "./hooks.js";

const usersSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    email: {
      type: String,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false }
);

usersSchema.pre("findOneAndUpdate", hooks.runValidationOnUpdate);

usersSchema.post(["save", "findOneAndUpdate"], hooks.handleSaveError);

const User = model("user", usersSchema);

export default User;
